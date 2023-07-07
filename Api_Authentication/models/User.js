import mongoose, { mongo } from "mongoose";


//defining schema

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    tc: {
        type: String,
        required: true,
        trim: true
    },
})

const userModel = mongoose.model("user", userSchema)
export default userModel