const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const InvoiceSchema = new Schema ({
    adminId: {
        type: String
    },
    staffId: {
        type: String
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
    status : {
        type : String
    }
}, {timestamps: true})

const invoices = mongoose.model('invoices', InvoiceSchema);
module.exports = invoices; 