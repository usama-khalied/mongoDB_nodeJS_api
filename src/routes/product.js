const express = require("express");
const routes = express.Router();
const productControllers = require("../controllers/product");
const uploadController = require("../middleware/upload");

routes.get("/Product/getAllProducts", productControllers.getAllProducts);
routes.post(
  "/Product/postData",
  uploadController,
  productControllers.postProduct
);
routes.delete("/Product/del/:ProductCode", productControllers.deleteProduct);
routes.get("/Product/get/:ProductCode",productControllers.dataById);

module.exports = routes;
