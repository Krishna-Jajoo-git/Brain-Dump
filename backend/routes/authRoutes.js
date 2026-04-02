import express from 'express'
import bcrypt from 'bcryptjs'
import User from '../models/user.js'
import jwt from 'jsonwebtoken'

const router =express.Router()

router.post('/register',async (req,res)=>{
    try{
        const {username,email,password}=req.body
        const userExists=await User.findOne({email})
        if(userExists){
            return res.status(400).json({ message :"This email is already registered"})
        }
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)

        const newUser = new User({
            username,
            email,
            password:hashedPassword
        })
        await newUser.save()
        res.status(201).json({message:"User created successfully"})
    }catch(error){
        res.status(500).json({Error:error.message})
    }
})

router.post('/login',async (req,res)=>{
    try{
        const {email,password} =req.body
        const user = await findOne({email})
        if(!user){
            return res.status(400).json({message:"Invalid Email or Password"})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({message:"Invalid Email or Password"})
        }
        const token=jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:'1d'}
        )
        res.status(200).json({
            message : "Login Successfull",
            token,
            id:user._id,
            username:user.username,
            email:user.email
        })
    }
    catch(error){
        return res.status(500).json({Error : error.message})
    }

})

export default router