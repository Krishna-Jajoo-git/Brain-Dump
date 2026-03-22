import express from 'express'
import mongoose from 'mongoose'
import logger from './middleware/logger.js'
import router from './routes/noteRoutes.js'

const app =express()
const PORT =5000
const mongoURI = 'mongodb://localhost:27017/braindump'

app.use(express.json())
app.use(logger)

app.use('/api/notes',router)

mongoose.connect(mongoURI)
    .then(()=>console.log(`connection established`))
    .catch((error)=>console.log(`Error: ${error.message}`))

app.get('/',(req,res)=>{
    res.send(`Welcome to the Brain Dump API!`)
})

app.listen(PORT,()=>{
    console.log(`server runing`)
    console.log(`http://localhost:${PORT}`)
})