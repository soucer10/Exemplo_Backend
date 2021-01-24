const {Router}=require('express')
const UserController=require('./Controller/UserController')
const LogonController=require('./Controller/LogonController')
const middleware=require('./Middleware/token')

const routers=Router()


routers.get('/',async (req,res)=>{

    res.json({message:"A minha magrelinha é uma proncesa!"})

})
routers.post('/cadastro',UserController.Cadastro)
routers.post('/login',UserController.Login)  

routers.use(middleware)

routers.get('/teste',LogonController.teste)

module.exports=routers