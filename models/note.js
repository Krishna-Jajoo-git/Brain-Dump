import mongoose from 'mongoose'

const noteSchema=new mongoose.Schema({
    title : {
        type :String,
        required : [true,`Title cannot be empty`],
        trim : true
    },
    description : {
        type : String,
        required : [true,   `Description ios required`]
    },
    time : {
        type : Date,
        default : Date.now
    }
})

const Note = mongoose.model('Note',noteSchema)
export default Note