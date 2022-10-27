const express = require("express");
const routes =  express.Router();
const orderStatusControllers  = require('../controllers/orderStatus')


// Get All Orders Status using this route - complete testing ✔✔✔
routes.get("/getAllOrdersStatus",orderStatusControllers.getAllOrdersStatus);




module.exports = routes