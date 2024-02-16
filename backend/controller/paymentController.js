import asyncHandler from 'express-async-handler'
import { stripe } from './userController.js'

// Server-side code
const confirmPayment = asyncHandler(async (req, res) => {

    let { clientSecret, paymentMethodId ,paymentIntentId } = req?.body
    if (!clientSecret || !paymentMethodId || !paymentIntentId) return res.status(500).json({ error: 'Something missing ! clientSecret or PaymentMethodId .' });
    try {
        const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId, {
            payment_method: paymentMethodId
        });

        // const setupIntentCreated = await stripe.setupIntents.create({
        //     payment_method_types: ['card'],
        // });
      

        // const setupIntentConfirm = await stripe.setupIntents.confirm(
        //     clientSecret,
        //     {
        //         payment_method: paymentMethodId,
        //     }
        // );

        return res.status(200).json(paymentIntent);
    } catch (error) {
        console.error('Error confirming payment:', error);
        return res.status(500).json({ error: error.message });
    }
})

export { confirmPayment }