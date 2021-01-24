const {Schema,model}=require("mongoose")
const bcrypt=require("bcrypt")


const User=new Schema({

    nome:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{ timestamps:true})


User.pre('save',async function (next){
    
    this.password=await bcrypt.hash(this.password,10)
    return next()
})

module.exports=model('Users',User)