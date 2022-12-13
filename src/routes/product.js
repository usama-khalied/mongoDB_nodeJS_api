const express = require("express");
const routes =  express.Router();
const productControllers  = require('../controllers/product')


routes.get("/Product/getAllProducts",productControllers.getAllProducts);

routes.post("/Product/postData",productControllers.postProduct);


module.exports = routes;