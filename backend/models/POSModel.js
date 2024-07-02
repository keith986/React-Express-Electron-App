const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const POSSchema = new Schema ({
    adminId: {
        type: String
    },
    staff: {
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
        type : String
    },
    quantity: {
        type: String
    },
    totalprice : {
        type : String
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
    status: {
        type: String
    }
})
