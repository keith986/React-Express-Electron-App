const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const bodyparser = require('body-parser')
const dbconn = require('../backend/configs/config')
const dotenv = require('dotenv')
dotenv.config()
require('colors')

dbconn();
 
const app = express();
 
//routes 
const userRouters = require('./routers/router')
app.use('/', userRouters);

//listening to port
app.listen('5000', function(err){
    if(err) throw err;
    console.log('App is running..')    
}) 