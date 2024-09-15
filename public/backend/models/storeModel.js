const mongoose = require('mongoose')
const Schema = mongoose.Schema

const storeSchema = new Schema({
    userid: {
        type: String,
        require
    },
    storename : {
        type: String,
        require
    },
    manager : {
        type: String,
        require
    },
    location : {
        type: String,
        require
    },
    phone: {
        type: String,
        require
    },
    status: {
        type: String,
        require
    }
},{timestamps: true})

const Store = mongoose.model('Store', storeSchema)
module.exports = Store