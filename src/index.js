const express = require("express");
const app = express();
require('dotenv').config()
require('./config/DatabaseConnctions');
const orderRoutes = require('./routes/order');
const orderStatusRoutes = require('./routes/orderStatus')
const cors = require('cors');
const port = process.env.PORT;


app.use(express.json());
app.use(cors())
app.use(orderRoutes)
app.use(orderStatusRoutes);
app.listen(port,() => {
    console.log(`on port ${port}`)
});