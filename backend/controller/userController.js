import asyncHandler from "express-async-handler"
import User from "../schema/User.js"
import Stripe from 'stripe'

export const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

const createPaymentMethod = async () => {
    try {
        const paymentMethod = await stripe.paymentMethods.create({
            type: 'card',
            card: {
                token: 'tok_visa'
            },
        });

        console.log(paymentMethod, ':: method ::');

        return paymentMethod.id; // Return the PaymentMethod ID
    } catch (error) {
        console.log(error, ':: method error ::');
        throw new Error('Error creating PaymentMethod: ' + error.message);
    }
}

const addUser = asyncHandler(async (req, res) => {
    try {
        let { name, email, number, website, leadAmount } = req.body;

        console.log(req?.body, ':: body ::');

        // Manually validate fields
        if (!name || !email || !number || !website || !leadAmount) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Validate phone number using regex
        const phoneNumberRegex = /^\d{10}$/;
        if (!phoneNumberRegex.test(number)) {
            return res.status(400).json({ error: 'Invalid phone number format' });
        }

        // Validate website using regex
        const websiteRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;

        if (!websiteRegex.test(website)) {
            return res.status(400).json({ error: 'Invalid website URL format' });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            if (existingUser.is_payment_done) {
                return res.status(400).json({ error: 'User with this email already exists' });
            } else {
                // Update user information
                const updatedUser = await User.findOneAndUpdate(
                    { email },
                    { name, number, website },
                    { new: true } // Return the updated user
                );

                return res.status(200).json(updatedUser);
            }
        }

        // Create PaymentMethod
        const paymentMethodId = await createPaymentMethod();

        // create customer in stripe
        const customer = await stripe.customers.create({ email, payment_method: paymentMethodId });
        const ephemeralKey = await stripe.ephemeralKeys.create({
            customer: customer.id
        }, { apiVersion: '2023-10-16' })

        // add payment request 
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(Number(leadAmount)),
            currency: 'INR',
            payment_method_types: ['card'],
            metadata: { name },
            customer: customer?.id
        })

        let user = new User({ name, email, number, website, client_secret: paymentIntent?.client_secret, payment_intent_id: paymentIntent?.id, ephemeralKey: ephemeralKey?.secret, customer: customer?.id, payment_method_id: paymentMethodId });

        const savedUser = await user.save();

        return res.status(200).json(savedUser);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})

const deletePaymentIntent = asyncHandler(async (req, res) => {

    let { payment_intent_id } = req?.body

    try {
        await stripe.paymentIntents.cancel(payment_intent_id);
        res.status(200).json({ message: 'Payment Intent deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting Payment Intent' });
    }
})


export { addUser, deletePaymentIntent }
