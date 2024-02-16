import asyncHandler from 'express-async-handler'
import { stripe } from './userController.js'

// Server-side code
const confirmPayment = asyncHandler(async (req, res) => {

    let { clientSecret, paymentMethodId } = req?.body
    if (!clientSecret || !paymentMethodId) return res.status(500).json({ error: 'Something missing ! clientSecret or PaymentMethodId .' });
    try {
        const paymentIntent = await stripe.paymentIntents.confirm(clientSecret, {
            payment_method: paymentMethodId
        });
        
        return res.status(200).json(paymentIntent);
    } catch (error) {
        console.error('Error confirming payment:', error);
        return res.status(500).json({ error: error.message });
    }
})

export { confirmPayment }