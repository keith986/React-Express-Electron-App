const mongoose = require('mongoose')
require('colors')

const dbConn = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected to Database ${conn.connection.host}`.bgGreen)
    }catch(err){
        console.log(`Database error: ${err.message}`.bgRed)
    }
} 

module.exports = dbConn