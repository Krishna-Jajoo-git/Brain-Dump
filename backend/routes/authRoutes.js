import express from 'express'
import bcrypt from 'bcryptjs'
import User from '../models/user.js'

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

export default router