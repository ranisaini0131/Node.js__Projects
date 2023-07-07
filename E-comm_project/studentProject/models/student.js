import mongoose from "mongoose";
import bcrypt from "bcrypt";

//create schema

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
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
    pImage: {
        type: String,
    },
    Role: {
        type: String,
        default: "student",
        enum: ["student", "admin"]
    }
});

studentSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12)
    }
    next();
})



const Student = mongoose.model("Student", studentSchema);

export default Student;






//name
//email/phone nuber
//role deault(student)

//database connect
//signup
//login