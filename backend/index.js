import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import 'dotenv/config'
import logger from './middleware/logger.js'
import router from './routes/noteRoutes.js'
import authRouter from './routes/authRoutes.js' 
import rateLimit from 'express-rate-limit'

const app =express()
const PORT =process.env.PORT
const mongoURI = process.env.MONGO_URI

app.use(cors())
app.use(express.json())
app.use(logger)

const postLimiter=rateLimit({
    windowMs :2*60*1000,
    max:10,
    message : 'Too many notes created , wait for a minute'
})

app.use('/api/notes',postLimiter,router)
app.use('/api/auth',authRouter)
mongoose.connect(mongoURI)
    .then(()=>{ 
        console.log('✅ Connected to MongoDB Atlas (Cloud)')
        app.listen(PORT,()=>{
            console.log(`server runing`)
            console.log(`http://localhost:${PORT}`)
        })
    })
    .catch((error)=>{
        console.log("Connection Failed : ", error.message)
        process.exit(1)
    })

    
    app.get('/',(req,res)=>{
        res.send(`Welcome to the Brain Dump API!`)
    })