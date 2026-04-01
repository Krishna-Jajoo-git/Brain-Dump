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
        res.status(400).json({Error:error.message})
    }
})

router.get('/',async (req,res)=>{
    try{
        const allNotes= await Note.find().sort({time:-1});
        res.status(200).json(allNotes);
    }catch(error){
        res.status(500).json({Error : error.message})
    }
});

router.delete('/:id',async (req,res)=>{
    try{
        const deletedNote=await Note.findByIdAndDelete(req.params.id)
        if(!deletedNote){
            return res.status(404).json({message:"Note not found"})
        }
        res.status(200).json({message:"Note deleted Successfully",deletedNote})
    }catch(error){
        return res.status(500).json({Error: error.message})
    }
})

router.put('/:id',async (req,res)=>{
    try{
        const {title,description}=req.body;
        const updatedNote=await Note.findByIdAndUpdate(req.params.id,{title,description},{new: true})
        if(!updatedNote){
            return res.status(404).json({message:"Note not found"})
        }
        res.status(200).json({message:"Note Updated Successfully",updatedNote})
    }catch(error){
        res.status(500).json({Error: error.message})
    }
})

export default router