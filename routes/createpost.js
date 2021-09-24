const { json } = require('express');
const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const postModel=require('../database/post');
const {loginRequest}=require('../middleware/loginMiddleware');


router.get('/allposts',loginRequest,(req,res)=>{
    postModel.find()
    .populate("postedBy","_id name")
    .then(posts=>{
        res.status(200).json({posts});
    })
})


router.get('/myposts',loginRequest,(req,res)=>{
    postModel.find({postedBy:req.user._id})
    .then(posts=>{
        res.status(200).json({posts})
    })
    .catch(err=>{console.log(err)});
})


router.post('/createpost',loginRequest,(req,res)=>{
    const {title,body,photo}=req.body;
    if(!title || !body || !photo)
    {
        return res.status(422).json({Error:"All fields required"});
    }
    const newPost=new postModel({
        title,
        body,
        photo,
        postedBy:req.user
    })
    newPost.save()
    .then(result=>{res.status(201).json({Message:"Post created"})})
    .catch(err=>{console.log(err)});
})

router.delete('/delete/:postId',loginRequest,(req,res)=>{
    postModel.findOne({_id:req.params.postId})
    .populate("postedBy","_id")
    .exec((err,post)=>{
        if(err || !post)
        {
            return res.status(422).json({Error:"Post not found"})
        }
        else if(post.postedBy._id.toString()===req.user._id.toString())
        {
            post.remove()
            .then(result=>{
                res.status(201).json(result)
            })
            .catch(err=>console.log(err));
        }
    })
})

module.exports=router;