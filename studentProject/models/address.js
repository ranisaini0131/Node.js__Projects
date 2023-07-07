import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    city:
    {
        type: String,
    },

    pincode:
    {
        type: String,
    },

    nearby:
    {
        type: String,
    },

    state:
    {
        type: String,
    },

    country:
    {
        type: String,
    },

    street:
    {
        type: String,
    },

    userId:
    {
        type: String,
    },



})


const Address = mongoose.model("Address", addressSchema); //isis name se collection

export default Address;
