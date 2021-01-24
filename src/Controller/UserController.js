const Users=require('../Models/User')
const bcypt=require('bcrypt')
const jwt=require('jsonwebtoken')


async function createToken(payload){

    let token=await jwt.sign({id:payload.id},process.env.SECRET,{
        expiresIn:86400
    })

    return token    
}

module.exports={

    async Cadastro(req,res){

        const {nome,email,password} = req.body
        
        const aux=await Users.findOne({email})        
        if(aux){
            return res.status(401).json({message:"Usuário existente!"})}


        const user=await Users.create({
            nome,
            email,
            password
        })
        user.password=undefined
        res.status(200).json(user)
    },

    async Login(req,res){

        const {login,password} = req.body

        const user=await Users.findOne({ email:login})

        if(!user){
            return res.status(401).json({message:"Usuário não existente!"})
        }
        if(await bcypt.compare(password,user.password)){
            user.password=undefined
            return res.status(200).json({user,token:await createToken(user)})
        }else{
            return res.status(401).json({message:"Verificar Email e Senha"})
        }

    }

}