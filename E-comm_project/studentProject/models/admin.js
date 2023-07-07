import mongoose from "mongoose";
import bcrypt from "bcryptjs";

//create schema

const adminSchema = new mongoose.Schema({
    name: {
        name: String,
        // required: true,
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
    },

    password: {
        type: String,
    },
    Role: {
        type: String,
        default: "superAdmin",
    },
});

adminSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12)
    }
    next();
})

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;
