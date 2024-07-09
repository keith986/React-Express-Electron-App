const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const InvoiceSchema = new Schema ({
    adminId: {
        type: String
    },
    staffId: {
        type: String
    },
    invoiceno : {
        type : String
    },
    staffname : {
        type : String,
    },
    customername: {
        type: String
    },
    customeremail: {
        type: String
    },
    customerphone: {
        type: String
    },
    item : {
        type : Array
    },
    grandtotal : {
        type : String
    },
    discount: {
        type: String
    },
    method: {
        type: String
    },
    totalamount:{
        type: String
    },
    paid : {
        type : String
    },
    bal : {
        type: String,
        default : 0
    },
    status : {
        type : String
    },
    date : {
        type : String
    },
    time : {
        type : String
    }
}, {timestamps: true})

const invoices = mongoose.model('invoices', InvoiceSchema);
module.exports = invoices; 