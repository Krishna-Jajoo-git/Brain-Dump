import jwt from 'jsonwebtoken'

const auth = async (req,res,next)=>{
    try{
        const authHeader=req.header('Authorization')
        if(!authHeader || !authHeader.startsWith('Bearer ')){
            return res.status(401).json({message:"Acesess denied"})
        }
        const token =authHeader.replace('Bearer ', '')
        if(!token){
            return res.status(401).json({message : "Access Denied. No token provided"})
        }
        const decode =jwt.verify(token,process.env.JWT_SECRET)
        req.user=decode
        next()
    }catch(error){
        return res.status(401).json({Error : error.message})
    }
}

export default auth;