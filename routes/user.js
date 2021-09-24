const { json } = require('express');
const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const postModel=require('../database/post');
const {loginRequest}=require('../middleware/loginMiddleware');
const Model=require('../database/user');

router.get('/user/:id',loginRequest,(req,res)=>{
    Model.findOne({_id:req.params.id},{password:0,cpassword:0})
    .then(user=>{
        postModel.findOne({postedBy:req.params.id})
        .populate("postedBy","_id name")
        .exec((err,posts)=>{
            if(err)
            {
               return res.status(422).json({Error:err})
            }
            res.status(200).json({user,posts});
        })
    })
    .catch(err=>{return res.json({Error:"User not found"})});

})


module.exports=router;