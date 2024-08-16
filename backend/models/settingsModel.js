const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const settingsSchema = new Schema({
    adminId : {
        type: String
    },
    minimumqty : {
        type : String
    },
    toggle : {
        type : String
    }   
},{timestamps : true})

const settings = mongoose.model('settings', settingsSchema)
module.exports = settings