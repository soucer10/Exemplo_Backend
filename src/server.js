const http=require('http')
const https=require('https')
const express=require('express')
const bodyParser=require('body-parser')
const mongoose=require('mongoose')
const dotenv=require('dotenv').config()
const Users=require('./Models/User')
const Routers=require('./Routers')
const cors = require('cors')
const fs=require('fs')

const key=fs.readFileSync('./src/Certificados/selfsigned.key','utf8')
const cert=fs.readFileSync('./src/Certificados/selfsigned.crt','utf-8')

mongoose.connect(`mongodb+srv://${process.env.UserMongo}:${process.env.PassMongo}@cluster0.fwaym.mongodb.net/Userskpi?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true})

const app=express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended:true}))
app.use(bodyParser.json())
app.use(Routers)

const serverHttps=https.createServer({key:key, cert:cert},app)

serverHttps.listen(3333)
