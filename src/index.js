const express = require("express");
const app = express();
require('dotenv').config()
require('./config/DatabaseConnctions');
const orderRoutes = require('./routes/order');
const orderStatusRoutes = require('./routes/orderStatus')
const productRoutes = require('./routes/product')
const cors = require('cors');
const port = process.env.PORT;
const bodyParser = require("body-parser");



app.use(express.json());
app.use(bodyParser.json());
app.use(cors())
app.use(orderRoutes)
app.use(orderStatusRoutes);
app.use(productRoutes)

app.listen(port,() => {
    console.log(`on port ${port}`)
});