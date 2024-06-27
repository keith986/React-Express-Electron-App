const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    adminId : {
        type: String,
        require: true
    },
    name : {
        type: String,
        require: true
    },
    description : {
        type: String,
        require: true
    },
    costprice : {
        type: String,
        require: true
    },
    sellingprice : {
        type: String,
        require: true
    },
    categories : {
        type: String,
        require: true
    },
    warehouse : {
        type: String,
        require: true
    },
    quantity : {
        type: String,
        require: true
    },
    supplier : {
        type: String,
        require: true
    },
    batchno : {
        type: String,
        require: true
    },
    mandate : {
        type : String,
        require : true
    },
    expdate : {
        type : String,
        require : true
    }
},{timestamps: true})

const Products = mongoose.model('Products', productSchema)
module.exports = Products