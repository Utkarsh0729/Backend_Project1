import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))


// major middleware configurations
app.use(express.json({limit: "16kb"})) // sets the limit for size of data that has to be recieved from user through forms, etc.
app.use(express.urlencoded({extended: true, limit: "16kb"})) // this middleware is used to decode the data that is recieved from the URL (limit in this one sets the limit of URL to be recieved)
app.use(express.static("public")) // it is used to keep some sort of data say pdf, file/folder stored temporary in database in a public folder named "public"
app.use(cookieParser()) // configuring cookieParser 


export { app };