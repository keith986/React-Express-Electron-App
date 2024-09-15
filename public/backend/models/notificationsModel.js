const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    adminId : {
        type : String
    },
    inoviceno : {
        type : String
    },
    staffname : {
        type : String
    },
    invoiceno : {
        type : String
    },
    paid : {
        type : String
    },
    read : {
        type : String
    }
},{timestamps : true})

const notifications = mongoose.model('notifications', notificationSchema);
module.exports = notifications;