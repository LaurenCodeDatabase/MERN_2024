import { User } from "../Model/newusers.js";
import jwt from 'jsonwebtoken';
export const isAuthenticated = async(req,res,next) => {
    const {token} = req.cookies;
    //console.log(token);
    if(!token) return res.status(400).json({
        success: false,
        message: "Please Login..!"
    })

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    //console.log("decoded Data", decode);
    req.user = await User.findById(decode._id);
    //console.log(req.user);
    // res.json({
    //     hello:"Hello",
    //     UserName: req.user.name
    // })
    next();
}