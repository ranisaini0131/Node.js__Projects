import mongoose from "mongoose";
import bcrypt from "bcryptjs";

//create schema

const resultSchema = new mongoose.Schema({
    name: {
        name: String,
        // required: true,
    },
    rollno: {
        type: String,
        // required:true
    },
    physics:
    {
        type: Number,
    },
    chemistry: {
        type: Number,
    },
    maths: {
        type: Number,
    },
    division: {
        type: String
    },
    percentage: {
        type: Number
    },
    phone: {
        type: String,
        // required: true,
        unique: true,
    },
    email: {
        type: String,
        // required: true,
        unique: true
    }
});

const Result = mongoose.model("Result", resultSchema);
export default Result;
