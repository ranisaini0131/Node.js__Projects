import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDb from "./db/dbConnect.js";
dotenv.config({ path: "./config.env" });
import user from "./routes/user.js";
import admin from "./routes/admin.js";



const app = express();

const port = 9000;

app.use(express.json());

app.use(cors());

const url = "mongodb://127.0.0.1:27017";
connectDb(url);


app.use("/api", user);
app.use("/api", admin);




app.listen(port, (req, res) => {
    console.log(`Server is running on ${port}`)
})

