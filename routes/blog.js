//import express from 'express';
import express from "express";
import { isAuthenticated } from '../middleware/auth.js';
//import { isAuthenticated } from '../middleware/auth';
import {createBlog, myBlog, updateBlog, deleteBlog,getAllBlogs,getBlogbyId} from '../controllers/blog.js'

const blogRouter = express.Router();

// blogRouter.get('/', async(req,res)=>{
//     res.json({
//         success: true,
//         message:"New blog point"
//     })
// })
blogRouter.get('/', (req, res) => {
    res.json({
        success: true,
        message: "now you are in mongoodb"
    })
})
blogRouter.post('/new',isAuthenticated, createBlog);

blogRouter.get('/myblogs',isAuthenticated, myBlog);

blogRouter.put('/:id',isAuthenticated, updateBlog);

blogRouter.delete('/:id',isAuthenticated, deleteBlog);
blogRouter.get('/getallblogs', getAllBlogs);
blogRouter.get('/blog/:id', isAuthenticated, getBlogbyId);
export default blogRouter;