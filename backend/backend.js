const express = require('express')
const dbconn = require('../backend/configs/config')
var cors = require('cors')
const {Server} = require('socket.io');
const dotenv = require('dotenv')
dotenv.config()
require('colors')

dbconn(); 

const app = express();

app.use(cors({
     credentials: true,
    origin: 'http://localhost:3000'
}))

//routes 
const userRouters = require('./routers/router')
app.use('/', userRouters);

const io = new Server({
    cors: {
    origin: "http://localhost:3000",
    credentials : true
  }
})

io.on('connection', async (socket) => {
   
     console.log('connected user' + socket.handshake.auth.token);
     var userId = socket.handshake.auth.token;  

     

    socket.on('disconnect', async () => {
        console.log('disconnected user' + socket.handshake.auth.token)
    })

})


//listening to ports
app.listen('5000', function(err){
    if(err) throw err;
    console.log('App is running..')    
}) 

io.listen(4000, (err) => {
    if(err) throw err
    console.log('This is the socket PORT')
})