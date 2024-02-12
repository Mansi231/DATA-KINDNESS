import asyncHandler from "express-async-handler"
import User from "../schema/User.js"

const addUser = asyncHandler(async (req, res) => {
    try {
        let { name, email, number, website } = req.body;

        // Manually validate fields
        if (!name || !email || !number || !website) {
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

        let user = new User({ name, email, number, website });
        const savedUser = await user.save();

        return res.status(200).json(savedUser);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})

export { addUser }
