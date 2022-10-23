const express = require("express");
const routes =  express.Router();
const orderControllers  = require('../controllers/order')




routes.get("/getAllProductsData",orderControllers.getAllOrders);

module.exports = routes