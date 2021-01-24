const jwt=require('jsonwebtoken')

module.exports=async(req,res,next)=>{

    const {token}=req.headers
    if(!token){
        return res.status(401).json({message:"Acesso negado A"})
    }

    await jwt.verify(token,process.env.SECRET,function (err,decoded){

        if(err){
            return res.status(401).json({message:"Acesso negado"})
        }
        req.userid=decoded
    })
    return next()
}

