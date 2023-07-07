import mongoose from "mongoose";
mongoose.set("strictQuery", false);

const connectDb = async (url) => {
    try {
        const dbOption = {
            dbName: "eCommProject"
        }
        await mongoose.connect(url, dbOption);
        console.log("DB connected to mongodb");
    } catch (error) {
        console.log(error);
    }
}

export default connectDb;