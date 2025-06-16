// require("dotenv").config({path: './env'});
import dotenv from "dotenv";
import connectDB from "./db/index.js";

// you have to configure dotenv to use the .env file in the beginning of your application
// also make modifications in package.json->"-r dotenv/config --experimental-json-modules"
dotenv.config({
    path: "./env"
});


connectDB()
.then(() => {
    app.on("error", (error) => {
        console.log("ERROR: ", error)
        throw error 
    })

    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running on port-> ${process.env.PORT}`)
    })
})
.catch((err) => {
    console.log("MongoDB connection failed !!! ", err)
})













/*
import express from "express";
const app = express();

( async () => {
    try {
        mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error) => {
            console.log("ERROR: ", error)
            throw error 
        })

        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`)
        })

    } catch (error) {
        console.error("ERROR: ", error)
        throw err
    }
})()
*/