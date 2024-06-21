var use_route = require('express')();
var express = require('express');
const morgan = require('morgan')
const session = require('express-session')
var cors = require('cors')
var path = require('path')
const cookieParser = require('cookie-parser')
const {SESSION_SECRET} = process.env;

use_route.use(session(
    {
    secret : SESSION_SECRET,
   // resave : false,
   // saveUninitialized: true,
   // cookie : {secure : true}
   }
))

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
use_route.use(express.urlencoded({limit: '50mb',extended: false}))
use_route.use(express.json({limit: '50mb'}))

const useController = require('../controllers/Controller')

use_route.get('/', useController.preview)
use_route.post('/signup', useController.signup)
use_route.post('/login', useController.login)
use_route.get('/profile', useController.getProfile)

module.exports = use_route;