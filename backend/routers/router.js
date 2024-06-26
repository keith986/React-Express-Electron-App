var use_route = require('express')();
var express = require('express');
const morgan = require('morgan')
//const session = require('express-session')
var cors = require('cors')
var path = require('path')
const cookieParser = require('cookie-parser')
//const {SESSION_SECRET} = process.env;

/*
use_route.use(session(
    {
    secret : SESSION_SECRET,
   // resave : false,
   // saveUninitialized: true,
   // cookie : {secure : true}
   }
))
*/

//middleware
//connect to frontend
use_route.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))

//add middleware
use_route.use(morgan('dev'))
use_route.use(cookieParser())
//url extend url
use_route.use(express.urlencoded({extended: false}))
use_route.use(express.json())

const useController = require('../controllers/Controller')

use_route.get('/', useController.preview)
use_route.post('/signup', useController.signup)
use_route.post('/login', useController.login)
use_route.get('/profile', useController.getProfile)
use_route.post('/store', useController.store)
use_route.get('/storeData', useController.storeData)
use_route.post('/editstore', useController.editStore)
use_route.post('/deletestore', useController.deletestore)
use_route.post('/adduser', useController.adduser)
use_route.get('/users', useController.users)
use_route.post('/edituser', useController.edituser)
use_route.post('/deleteuser', useController.deleteuser)

module.exports = use_route;