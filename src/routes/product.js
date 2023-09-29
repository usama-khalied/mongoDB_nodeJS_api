const express = require("express");
const routes = express.Router();
const productControllers = require("../controllers/product");
const uploadController = require("../middleware/upload");
const verifyToken = require('../middleware/auth');

routes.get("/Product/getAllProducts", productControllers.getAllProducts);
routes.post(
  "/Product/postData",
  uploadController,
  productControllers.postProduct
);
routes.delete("/Product/del/:ProductCode",verifyToken, productControllers.deleteProduct);
routes.get("/Product/:ProductCode",productControllers.dataById);

module.exports = routes;
