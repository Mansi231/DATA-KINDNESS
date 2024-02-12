import mongoose, { Schema } from "mongoose";

const paymentSchema = Schema({

    user: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: 'user'
    },
    category: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: 'categories'
    },
    lead: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: 'leads'
    },
    transaction_id: {
        type: String,
        minLenght: [8, 'something is wrong with transaction id .']
    },
    billing_address: {
        type: String
    }
},
    {
        timestamps: {
            createdAt: 'orderDate'
        }

    })


export default mongoose.model("user", paymentSchema);