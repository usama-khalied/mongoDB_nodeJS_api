const express = require("express");
const app = express();
require('dotenv').config()
require('./config/DatabaseConnctions');
const orderRoutes = require('./routes/order')
const cors = require('cors');
const port = process.env.PORT;


app.use(express.json());
app.use(cors())
app.use(orderRoutes)

app.listen(port,() => {
    console.log(`on port ${port}`)
});