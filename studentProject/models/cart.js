import mongoose from "mongoose";
import Schema from "mongoose";

const studentCartSchema = new mongoose.Schema({
    orderById: {
        type: Schema.Types.ObjectId, ref: "Student"//relation
    },
    orderTo: {
        type: String
    },
    paymentBy: {
        type: String
    },
    paymentTo: {
        type: String
    },
    items: {
        type: String
    },


})


const studentCart = mongoose.model("studentCart", studentCartSchema); //isis name se collection
export default studentCart;
