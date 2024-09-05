const mongoose = require('mongoose')

const connectDB = async()=>{
    try{
        const connect = await mongoose.connect(process.env.MONGO_URL)
        console.log("Database connected successfully")
    }
    catch(error){
        console.log(error)
        console.log("Database failed to connect")
    }
}

module.exports = connectDB