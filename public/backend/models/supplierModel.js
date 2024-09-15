const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const supplierSchema = new Schema({
    adminId : {
        type: String,
        require: true
    },
    name : {
        type: String,
        require: true
    },
    email : {
        type: String,
        require: true
    },
    phone : {
        type: String,
        require: true
    },
    company : {
        type: String,
        require: true
    },
    location : {
        type: String,
        require: true
    }
},{timestamps: true})

const Suppliers = mongoose.model('Suppliers', supplierSchema)
module.exports = Suppliers;