import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required :[true,'Username required'],
        trim : true
    },
    email : {
        type : String,
        required :[true,'Email required'],
        unique : true,
        lowercase : true,
        trim : true,
        match : [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
    },
    password : {
        type: String,
        required : [true, 'Password required'],
        minlength : [6,'Password must be of 6 character']
    }
},{timestamps: true})

const User = mongoose.model('User',userSchema)
export default User 