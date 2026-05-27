import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({
    path: "./.env",
});

connectDB();




















/*
========================= this is beginner's approach ===================
========================= proffessionals do this in seperate file in db folder ================

import mongoose from "mongoose";
import { DB_NAME } from "./constants";
import express from "express";
const app = express();
(async () => {
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        app.on("error", (error) => {
            console.log("ERROR : ", error);
            throw error
        })
    }catch(error){
        console.error("ERROR : ", error)
        throw error
    }
})()

*/
