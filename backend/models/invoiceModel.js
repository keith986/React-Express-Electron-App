const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const InvoiceSchema = new Schema ({
    adminId: {
        type: String
    },
    staffId: {
        type: String
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
        type: Array
    },
    totalamount:{
        type: String
    },
    status: {
        type: String
    }
})

const invoices = mongoose.model('invoices', InvoiceSchema)
module.exports = invoices 