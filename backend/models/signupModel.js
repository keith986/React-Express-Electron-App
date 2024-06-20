const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const signupSchema = new Schema({
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
    accounttype : {
        type : String,
        require: true
    }
},{timestamps: true})

const Users = mongoose.model('Users', signupSchema)
module.exports = Users