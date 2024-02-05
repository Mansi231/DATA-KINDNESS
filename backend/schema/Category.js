import mongoose, { Schema } from "mongoose";

const categorySchema = Schema({

    category_name: {
        type: String,
        lowercase: true,
        required: true,
        minlength: [3, 'name must be 3 letters long'],
    },

},
    {
        timestamps: {
            createdAt: 'createdAt'
        }

    })


export default mongoose.model("categories", categorySchema);