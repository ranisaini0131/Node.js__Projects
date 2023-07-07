import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./db/dbConnect.js";
dotenv.config({ path: "./config.env" })
// console.log(process.env.secreatKey);
import student from "./routes/student.js";
import admin from "./routes/admin.js";

const app = express();

const port = process.env.PORT;

app.use(express.json()); // parses incoming request with json payloads
app.use(cors());

const url = "mongodb://127.0.0.1:27017";
connectDB(url);

app.use("/api", student);
app.use("/api", admin);







app.listen(port, (req, res) => {
    console.log(`Server is running on ${port}`);
})



