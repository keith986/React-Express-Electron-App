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
use_route.post('/addsupplier', useController.addsupplier)
use_route.get('/getsuppliers', useController.getsuppliers)
use_route.post('/deletesupplier', useController.deletesupplier)
use_route.post('/editsupplier', useController.editsupplier)
use_route.post('/addcategory', useController.addcategory)
use_route.get('/getcategories', useController.getcategories)
use_route.post('/deletecategory', useController.deletecategory)
use_route.post('/addproduct', useController.addproduct)
use_route.get('/getproducts', useController.getproducts) 
use_route.post('/deleteproduct', useController.deleteproduct)
use_route.post('/editproduct', useController.editproduct)
use_route.post('/previewproduct', useController.previewProduct)
use_route.post('/adminlogout', useController.adminlogout)
use_route.post('/addcart', useController.addcart)
use_route.get('/getcart', useController.getcart)
use_route.post('/deleteone', useController.deleteone)
use_route.post('/deletemany', useController.deletemany)
use_route.post('/invoice', useController.invoice)
use_route.get('/getinvoice', useController.getinvoice)
use_route.post('/receipts', useController.receipts)
use_route.get('/userreports', useController.userreports)
use_route.get('/cashreport', useController.cashreport)
use_route.get('/transferreport', useController.transferReport)
use_route.get('/POSreport', useController.POSreport)
use_route.get('/chequereport', useController.chequereport)
use_route.get('/usercreditors', useController.userCreditors)

module.exports = use_route;