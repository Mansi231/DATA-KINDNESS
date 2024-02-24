import mongoose, { Schema } from "mongoose";

const paymentSchema = Schema({

    user: {
        type: Schema.Types.ObjectId,
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
    holder_name: {
        type: String,
        lowercase: true,
        required: true,
        minlength: [3, 'fullname must be 3 letters long'],
    },
    card_number: {
        type: String,
        lowercase: true,
        required: true,
        minlength: [16, 'card_number must be 16 letters long'],
        maxlength: [16, 'card_number must be 16 letters long'],
    },
    cvv: {
        type: String,
        lowercase: true,
        required: true,
        minlength: [3, 'cvv must be 3 letters long'],
        maxlength: [3, 'cvv must be 3 letters long'],
    },
    zipcode: {
        type: String,
        lowercase: true,
        required: true,
        minlength: [6, 'zipcode must be 6 letters long'],
        maxlength: [6, 'zipcode must be 6 letters long'],
    },
    billing_address: {
        type: String,
        require: true,
    },
    expiry_date:{
        type: String,
        require: true,
    },
},
    {
        timestamps: {
            createdAt: 'orderDate'
        }

    })


export default mongoose.model("payment", paymentSchema);