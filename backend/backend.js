const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const bodyparser = require('body-parser')
const dbconn = require('../backend/configs/config')
const dotenv = require('dotenv')
dotenv.config()
require('colors')

dbconn()
 
const app = express()

//middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended : false}))

 
//routers
app.get('/getMe', (req,res) => {
    res.send('hello you? the way')
})

//listening to port
app.listen('5000', function(err){
    if(err) throw err;
    console.log('App is running..')    
})