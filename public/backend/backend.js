const express = require('express');
const dbconn = require('../backend/configs/config.js');
var cors = require('cors');
const {Server} = require('socket.io');
//const dotenv = require('dotenv');
//dotenv.config();
require('colors');
const notifications = require('./models/notificationsModel');

dbconn();

const app = express();

app.use(cors({
     credentials: true,
     origin: 'http://localhost:3000'
}))

//routes 
const userRouters = require('../backend/routers/router')
app.use('/', userRouters);

const io = new Server({
    cors: {
    origin: "http://localhost:3000",
    credentials : true
  }
})

io.on('connection', async (socket) => {
   
    console.log('connected user' + socket.handshake.auth.token);
   //  var userId = socket.handshake.auth.token;  
     
    socket.on('newNotification', async (data) => {
        
        const noti_fications = notifications({
            adminId : data.adminId,
            invoiceno : data.result.invoiceno, 
            paid : data.result.paid, 
            staffname : data.result.staffname,
            read : 'no'
        })

        noti_fications.save()
                      .then((results) => {
                        io.emit('NewInvoice', {msg: 'Generated Invoice', adminId : data.adminId, invoiceno : data.result.invoiceno, paid : data.result.paid, staffname : data.result.staffname});
                       })
                      .catch((err) => {
                        console.log(err.message)
                       })
        
    })
 
    socket.on('disconnect', async () => {
        console.log('disconnected user' + socket.handshake.auth.token);
    })
 
})

//listening to ports
app.listen('5000', function(err){
    if(err) throw err;
    console.log('App is running...');    
}) 

io.listen(4000, (err) => {
    if(err) throw err
    console.log('This is the socket PORT')
})


