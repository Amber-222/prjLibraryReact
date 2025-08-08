//create instance of mongoose
const mongoose = require('mongoose')
require('dotenv').config() //call in env file to get connection string to db

//new method
const connectToMongo = async () => { //unlike in controller, method doesnt require parameters
    try {
        //parameters needed for accessing mongo online (atlas), not locally
        await mongoose.connect(process.env.CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("Connected to the database successfully")
    }
    catch (err) {
        console.error("Unable to connect to db")
        process.exit(1)
    }
}