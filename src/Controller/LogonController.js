const Users=require('../Models/User')


module.exports={

    async teste(req,res){
        console.log(req.userid)
        return res.json({message:"A esmeralda é uma chata! A belinha é uma linda! : "+req.userid})
    }
}