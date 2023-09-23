const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require('dotenv').config()
const port = process.env.PORT;
const calculator = require('sameed-cal1')
const cors = require('cors');

require('./config/DatabaseConnctions');


console.log(calculator);

const orderRoutes = require('./routes/order');
const orderStatusRoutes = require('./routes/orderStatus')
const orderSetting = require('./routes/orderSeting');
const productRoutes = require('./routes/product')
const loginRoutes = require('./routes/login')
const productSetting = require('./routes/productSetting');
const dashboardRoutes = require('./routes/dashboard')

app.use(express.json());
app.use(bodyParser.json());
app.use(cors())
app.use(orderRoutes)
app.use(orderStatusRoutes);
app.use(loginRoutes);
app.use(productRoutes);
app.use(orderSetting);
app.use(productSetting);
app.use(dashboardRoutes);

app.use('/uploads',express.static('uploads'))
app.listen(port,() => {
    console.log(`on port ${port}`)
});