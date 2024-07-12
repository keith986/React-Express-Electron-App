const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const signupSchema = new Schema({
    adminId : {
        type : String,
        require
    },
    companyname : {
        type: String,
        require: true
    },
    companyemail : {
        type: String,
        require: true
    },
    companyphone : {
        type: String,
        require: true
    },
    companylocation: {
        type : String,
        require: true
    },
    fullname : {
        type: String,
        require: true
    },
    adminemail:{
        type: String,
        require: true
    },
    adminphone:{
        type: String,
        require: true
    },
    username:{
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    warehouse : {
        type : String,
        require
    },
    role : {
        type : String,
        require
    },
    useremail: {
        type : String,
        require
    },
    accounttype : {
        type : String,
        require: true
    },
    time: {
        type: String,
    },
    date : {
        type : String,
    },
},{timestamps: true})

const Users = mongoose.model('Users', signupSchema)
module.exports = Users