import mongoose from "mongoose";

import PostMessage from "../models/postMessages.js";

export const getPosts = async(req, res) => {
    try {
        const postMessages = await PostMessage.find()

        if(req.role === 'admin') {
            res.status(200).json(postMessages.reverse());
        } else {
            res.status(200).json(postMessages.filter(postMessage => postMessage.email === req.email));
        }

    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const getPost = async (req, res) => {
    const { id: _id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.send("There is no transaction with this Id.");

    try {
        
        const postMessages = await PostMessage.findById(_id);
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({message: error.message});
    }


}

export const getPostsBySearch = async (req, res) => {
    const  { searchQuery }  = req.query; 

    try {
        const memberNo = new RegExp(searchQuery, 'i');

        const posts = await PostMessage.find({ memberNo });

        res.json({ data: posts });

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async(req, res) => {
    const post = req.body;

    const newPost = new PostMessage( { ...post, creator: req.userId, createdAt: new Date().toISOString()} );

    try {

        await newPost.save();

        res.status(201).json(newPost);

    } catch (error) {
        res.status(409).json({message: error.message });
    }
}


export const updatePost = async(req, res) => {
    const { id:_id } = req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post found with such Id");
    
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, {new: true});

    res.json(updatedPost);
}

export const deletePost = async(req, res) => {
    const { id:_id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post found with this Id");

    await PostMessage.findByIdAndDelete(_id);

    res.json({ message: "Transaction Deleted Succesfuly." });
}