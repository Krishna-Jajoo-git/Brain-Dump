import mongoose from 'mongoose'

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, `Title cannot be empty`],
        trim: true
    },
    description: {
        type: String,
        required: [true, `Description ios required`]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    time: {
        type: Date,
        default: Date.now
    }
},//{timestamps:true}
)

const Note = mongoose.model('Note', noteSchema)
export default Note