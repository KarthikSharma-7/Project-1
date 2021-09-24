const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
require('dotenv').config();
const Model=require('../database/user');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');


router.post('/signup',(req,res)=>{
   const {name,email,password,cpassword}=req.body;
   if(!name || !email || !password || !cpassword)
   {
       return res.status(422).json({
           Error:"All fields are required"
       })
   }
   else if(password !== cpassword)
   {
       return res.status(400).json({Error:"Passwords didn't match"});
   }
   Model.findOne({email})
   .then(userEmail=>{
       if(userEmail)
       {
          return res.status(422).json({Error:"User with this email already exists"});
       }
       bcrypt.hash(password,10)
       .then(hashpassword=>{
           const user=new Model({
               name,
               email,
               password:hashpassword,
               cpassword
           })
           user.save()
           .then(res.status(201).json({Message:"Saved"}))
           .catch(err=>{console.log(err)})
       }).catch(err=>{console.log(err)})
    })
   .catch(err=>{console.log(err)});
})


router.post('/signin',(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password)
    {
        return res.status(400).json({Error:"All fields are required"});
    }
    Model.findOne({email})
    .then(savedUser=>{
        if(!savedUser)
        {
            return res.status(422).json({Error:"Invalid credentials"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch)
            {
              //res.status(200).json({Message:"Loged in sucessfully"}); 
              const token=jwt.sign({_id:savedUser._id},process.env.JWT_KEY);
              const {_id,name,email}=savedUser;
              res.send({token,user:{_id,name,email}});
            }
            else
            {
                return res.status(400).json({Error:"Invalid credentials"});
            } 
        })
        .catch(err=>{console.log(err)})
    })
    .catch(err=>{console.log(err)})
})



module.exports=router;