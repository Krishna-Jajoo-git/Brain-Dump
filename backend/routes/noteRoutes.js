import express, { json } from 'express'
import Note from '../models/note.js'
import auth from '../middleware/auth.js'
const router=express.Router()

router.post('/',auth,async(req,res)=>{
    try{
        const {title,description}=req.body;
        const newNote=new Note({title,description,user:req.user.id})
        const savedNote = await newNote.save();
        res.status(201).json(savedNote)
    }catch(error){
        res.status(400).json({Error:error.message})
    }
})

router.get('/',async (req,res)=>{
    try{
        const allNotes= await Note.find().populate('user','username').sort({time:-1});
        res.status(200).json(allNotes);
    }catch(error){
        res.status(500).json({Error : error.message})
    }
});

router.get('/me',auth,async (req,res)=>{
    try{
        const myNote =(await Note.find({user:req.user.id})).sort({time:-1})
        res.status(200).json(myNote)
    }catch(error){
        return res.status(500).json({Error : error.message})
    }
})

router.delete('/:id',auth,async (req,res)=>{
    try{
        const note=await Note.findById(req.params.id)
        if(!note){
            return res.status(404).json({message:"Note not found"})
        }
        if(note.user.toString()!=req.user.id){
            return res.status(400).json({message :"Not authorised to delete this note"})
        }
        await Note.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"Note deleted Successfully",note})
    }catch(error){
        return res.status(500).json({Error: error.message})
    }
})

router.put('/:id',auth,async (req,res)=>{
    try{
        const {title,description}=req.body;
        const note=await Note.findById(req.params.id)
        if(!note){
            return res.status(404).json({message:"Note not found"})
        }
        if(note.user.toString() != req.user.id){
            return res.status(400).json({message : "Not authorised to update this note"})
        }
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            {title,description},
            {new:true}
        )
        res.status(200).json({message:"Note Updated Successfully",updatedNote})
    }catch(error){
        res.status(500).json({Error: error.message})
    }
})

export default router