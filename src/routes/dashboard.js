const express = require("express");
const routes =  express.Router();
const orderControllers  = require('../controllers/order')
// Middleware for api authentication
const verifyToken = require('../middleware/auth');

// Get All Orders using this route - complete testing ✔✔✔
routes.get('/Product/getDashboard',verifyToken,orderControllers.getDashboard);


module.exports = routes;