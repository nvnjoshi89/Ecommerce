import mongoose from "mongoose";

// Schema for creating user

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true

    },
    email: {
        type: String,
        unique: true,
        required: true

    },
    password: {
        type: String,
        required: true

    },
    cartData: {
        type: Object,

    },
    date: {
        type: Date,
        default: Date.now()
    }
}, { timestamps: true })

export default mongoose.model('users', userSchema)