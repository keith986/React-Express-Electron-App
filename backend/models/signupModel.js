const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const signupSchema = new Schema({
    companyname : {
        type: Array,
        require: true
    },
    companyemail : {
        type: Array,
        require: true
    },
    companyphone : {
        type: Array,
        require: true
    },
    companylocation: {
        type : Array,
        require: true
    },
    fullname : {
        type: Array,
        require: true
    },
    adminemail:{
        type: Array,
        require: true
    },
    adminphone:{
        type: Array,
        require: true
    },
    username:{
        type: Array,
        require: true
    },
    password: {
        type: Array,
        require: true
    },
    accounttype : {
        type : Array,
        require: true
    }
})

const Users = mongoose.model('Users', signupSchema)
module.exports = Users