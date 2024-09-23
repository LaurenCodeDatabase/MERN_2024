import { User } from "../Model/newusers.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import {generateCookie} from '../ulits/feature.js'

export const userRegister =  async (req, res) => {

    const { name, email, password } = req.body

    let user = await User.findOne({ email });

    if (user) return res.status(404).json({
        success: false,
        message: "User already exist..."
    })

    const hashPassword = await bcrypt.hash(password, 10);

    user = await User.create({
        name,
        email,
        password: hashPassword
    })

    generateCookie(user, res,201,"User register Success");
    // const token = jwt.sign({ _id: user._id }, '@$#%$%@$()');
    // //const token = jwt.sign({user}, '@$#%$%@$()');
    // console.log(token);

    // res.status(201).cookie("token", token).json({
    //     success: true,
    //     message: "User register successfully",
    //     user
    // })



    // const user = await(User.create({
    //     name,email,password
    // }))
    // res.json({
    //     success: true,
    //     message: "now you are in mongoodb",
    //     user
    // })
}

export const userLogin = async (req, res) => {

    const { email, password } = req.body

    let user = await User.findOne({ email });

    if (!user) return res.status(400).json({
        success: false,
        message: "User Not exist..."
    })

    //const hashPassword = await bcrypt.hash(password,10);
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).json({
        success: false,
        message: "Password is incorrect"
    })

    generateCookie(user, res,201,`User Login Success${user.name}`);
    // const user = await(User.create({
    //     name,email,password
    // }))
    // res.json({
    //     success: true,
    //     message: "now you are in mongoodb",
    //     user
    // })
}

export const userLogout = (req, res) => {
    res.status(200).cookie("token", "", {
        expires: new Date(Date.now())
    }).json({
        success: true,
        message: "Now you are logout"
    })

}

export const getMyProfile = (req,res) =>{
    res.status(200).json({
        success:true,
        UserName: req.user
    })
}

export const userById = async(req,res) =>{
    const id = req.params.id;

    const user = await User.findById(id);
    if(!user) return res.status(400).json({
        success: false,
        message:"Invalid ID"
    })
    

    res.status(200).json({
        success: true,
        message: "user is",
        user
    })
}