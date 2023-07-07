import mongoose from "mongoose";

const connectDb = async (url) => {
    try {
        const dbOption = {
            dbName: "Api_Authentication"
        }
        await mongoose.connect(url, dbOption)
        console.log("Connected successfully")
    } catch (error) {
        console.log(error);
    }
}

export default connectDb