const express=require("express")
const userRouter=express.Router()
const {UserModel}=require("../model/user.model")
const jwt=require("jsonwebtoken")
const bcrypt = require('bcrypt');


//registration
userRouter.post("/register",async(req,res)=>{
    const {email,password,name,city,is_married,age,gender}=req.body
    console.log(req.body)
    try{
        bcrypt.hash(password, 5, async (err, hash) => {
            const user=new UserModel({email,password:hash,name,city,is_married,age,gender})
            await user.save()
            res.status(200).send({"msg":"Registration has been done!"})
        });
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})

//login(authentication)
userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try{
        const user=await UserModel.findOne({email})
        if(user){
            bcrypt.compare(password,user.password, (err, result) => {
                if(result){
                    res.status(200).send({"msg":"Login successfull!","token":jwt.sign({"userID":user._id},"masai")})
                } else {
                    res.status(400).send({"msg":"Wrong Credentials"})
                }
            });
        }
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})


module.exports={
    userRouter
}