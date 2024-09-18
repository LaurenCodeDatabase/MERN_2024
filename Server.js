import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import router from "./routes/user.js";
import cookieParser from "cookie-parser";
import blogRouter from "./routes/blog.js";
import { config } from "dotenv";
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}));

config({
    path:'./data/config.env'
});

mongoose.connect(process.env.MONGO_URL,{dbName: "MERN_2024"}).then(()=>console.log("MONGOODB is Connected"));
//const port = 4000;

app.use('/api/users',router);

app.use('/api/blogs',blogRouter);

app.listen(process.env.PORT, ()=>console.log(`Server is running on port ${process.env.PORT}`));
