const mongoose = require("mongoose");
require('dotenv').config()
const DATABASE_URL = process.env.DATABASE_URL

mongoose.set('strictQuery', false);
mongoose.connect(`${DATABASE_URL}/mynewdb`,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}, (err) => {
     if(!err) {
        console.log("Database is connected");
     }
     else {
        console.log("Db is not connected")
     }
});
