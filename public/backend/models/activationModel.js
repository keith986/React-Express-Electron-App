const mongoose = require('mongoose')
const Schema = mongoose.Schema

const activationSchema = new Schema({
    useremail : {
        type: String,
        require: true
    },
    otpcode : {
        type: String,
        require: true
    }
}, {timestamps: true})

const OTP  = mongoose.model('OTP', activationSchema)
module.exports = OTP