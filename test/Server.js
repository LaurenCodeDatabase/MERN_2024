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
app.get("/",(req,res) => {
    res.status(200).send("Landing Page");
});

app.get("/about",(req,res) => {
    res.status(200).send("About us Page");
});
 const port = 8000;
app.listen(port, ()=>console.log(`Server is running on port ${port}`));