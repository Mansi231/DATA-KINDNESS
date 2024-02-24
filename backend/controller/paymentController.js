import asyncHandler from 'express-async-handler'
import User from '../schema/User.js';
import Payment from '../schema/Payment.js';

// Server-side code
const confirmPayment = asyncHandler(async (req, res) => {

    try {
        let { holder_name, card_number, cvv, expiry_date, zipcode, billing_address, email, lead, category } = req?.body

        if (!holder_name || !email || !card_number || !cvv || !expiry_date || !zipcode || !billing_address || !lead || !category) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const existingUser = await User.findOne({ email });

        let payment = new Payment({ holder_name, card_number, cvv, expiry_date, zipcode, billing_address, user: existingUser?._id, lead, category });

        const savedPayment = await payment.save();

        return res.status(200).json(savedPayment);
    } catch (error) {
        return res.status(500).json({ error: error?.message });
    }
})

export { confirmPayment }