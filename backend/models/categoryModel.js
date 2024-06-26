const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    adminId : {
        type : String,
        require: true
    },
    categoryname : {
        type : String,
        require: true
    }
}, {timestamps: true})

const Categories = mongoose.model('Categories', categorySchema)
module.exports = Categories