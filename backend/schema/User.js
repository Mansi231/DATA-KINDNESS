import mongoose, { Schema } from "mongoose";

const userSchema = mongoose.Schema({

    name: {
        type: String,
        lowercase: true,
        required: true,
        minlength: [3, 'fullname must be 3 letters long'],
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    number: {
        type: String,
        required: true,
        minlength: [10, 'phoneNumber must be 3 letters long'],
        maxLength: [10, 'phoneNumber must be 3 letters long']

    },
    website: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                // Regular expression to validate URL format
                return /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
            },
            message: props => `${props.value} is not a valid website URL`
        }
    },

},
    {
        timestamps: {
            createdAt: 'createdAt'
        }

    })


export default mongoose.model("users", userSchema);