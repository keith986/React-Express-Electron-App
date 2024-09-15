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
    productId : {
       type : String,
       require
    },
},{timestamps: true})

const rows = mongoose.model('rows', RowSchema)
module.exports = rows 