import mongoose, { Schema } from "mongoose";

const leadSchema = Schema({

    amount: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        require: true
    },

},
    {
        timestamps: {
            createdAt: 'createdAt'
        }

    })


export default mongoose.model("leads", leadSchema);