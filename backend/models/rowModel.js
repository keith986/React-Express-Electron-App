const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RowSchema = new Schema({
    staffId : {
        type : String,
        require
    },
    item : {
        type: Array,
        require
    },
    quantity : {
        type :  String,
        default: 0
    }
},{timestamps: true})

const rows = mongoose.model('rows', RowSchema)
module.exports = rows 