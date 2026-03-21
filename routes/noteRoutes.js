import express, { json } from 'express'
import Note from '../models/note.js'

const router=express.Router()

router.post('/',async(req,res)=>{
    try{
        const {title,description}=req.body;
        const newNote=new Note({title,description})
        const savedNote = await newNote.save();
        res.status(201).json(savedNote)
    }catch(error){
        res.status(400).json({Error:error.massage})
    }
})

export default router