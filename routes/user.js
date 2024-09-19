import express from "express";
// import { User } from "../Server.js";
// import bcrypt from "bcrypt";
// import jwt from 'jsonwebtoken';
import {userLogin, userRegister, userLogout, getMyProfile,userById} from '../controllers/user.js'
import {isAuthenticated} from "../middleware/auth.js"
const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        success: true,
        message: "now you are in mongoodb"
    })
})

router.get('/post', (req, res) => {
    res.json({
        success: true,
        message: "now you are in post route"
    })
})

router.post('/register', userRegister)

router.post('/login', userLogin)

router.get('/logout', userLogout )
router.get('/myprofile', isAuthenticated, getMyProfile)
router.get('/:id',userById);
export default router;