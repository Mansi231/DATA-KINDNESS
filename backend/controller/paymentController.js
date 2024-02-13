import asyncHandler from 'express-async-handler'
import { stripe } from './userController.js'


const addPayment = asyncHandler(async (req, res) => {
    const { payment_id ,clientSecret} = req.body;

    try {
        // Confirm the payment intent using the payment ID
        const paymentIntent = await stripe.paymentIntents.confirm(payment_id);
        res.json({ success: true, paymentIntent });

        // If payment is successful, you can proceed with further logic
        res.status(200).json({ success: true, paymentIntent });
        
    } catch (error) {
        // Handle errors appropriately
        console.error('Error confirming payment intent:', error);
        res.status(500).json({ success: false, error: error.message });
    }

})

export { addPayment }