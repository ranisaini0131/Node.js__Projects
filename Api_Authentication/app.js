import express from 'express'
import cors from "cors"
import dotenv from 'dotenv'
dotenv.config({ path: "./config.env" })
import connectDb from './db/connectDb.js'
import userRoute from "./routes/userRoute.js"


const app = express()
const port = process.env.port

//cors policy
app.use(cors())

//database config
const url = "mongodb://127.0.0.1:27017"
connectDb(url)

//json config
app.use(express.json())

app.use('/api', userRoute)

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
})