const express = require("express");
const routes = express.Router();
const orderStatusControllers = require('../controllers/orderStatus')
const verifyToken = require('../middleware/auth');

// Get All Orders Status using this route - complete testing ✔✔✔
routes.get("/getAllOrdersStatus", orderStatusControllers.getAllOrdersStatus);




module.exports = routes