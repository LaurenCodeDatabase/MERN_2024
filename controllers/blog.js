import {Blog} from "../Model/blogs.js";

export const createBlog = async(req, res) =>{
    const { title, description, imageUrl} = req.body;

    await Blog.create({
        title,
        description,
        imageUrl,
        user:req.user
    })
    res.status(201).json({
        success: true,
        message:"Blog is created"
    })
}
export const myBlog = async(req, res) =>{
    const userid = req.user._id;

    const blogs = await Blog.find({user:userid});

    res.status(200).json({
        success: true,
        blogs
    })
}
export const updateBlog = async(req, res) =>{
    const {title,description,imageUrl} = req.body;

    const id = req.params.id;

    const blog = await Blog.findById(id);
    if(!blog) return res.status(400).json({
        success: false,
        message:"Invalid ID"
    })

    blog.title = title,
    blog.description = description,
    blog.imageUrl = imageUrl

    blog.save();
    res.json({
        success: true,
        message:"updating blog",
        blog
    })
}
export const deleteBlog = async(req, res) =>{

    const id = req.params.id;

    const blog = await Blog.findById(id);
    if(!blog) return res.status(400).json({
        success: false,
        message:"Invalid ID"
    })
    await blog.deleteOne();

    res.status(200).json({
        success: true,
        message: "Blog deleted success"
    })
}

export const getAllBlogs = async(req,res)=>{

    const blogs = await Blog.find();

    if(!blogs) return res.status(400).json({
        success: false,
        message: "Blogs not available"
    })

    res.status(200).json({
        success:true,
        message:"all blogs are",
        blogs
    })
}

export const getBlogbyId = async(req,res) =>{
    const id = req.params.id;

    const blog = await Blog.findById(id);
    if(!blog) return res.status(400).json({
        success: false,
        message:"Invalid ID"
    })
    

    res.status(200).json({
        success: true,
        message: "your Blog",
        blog
    })
}