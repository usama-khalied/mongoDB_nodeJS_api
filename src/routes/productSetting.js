const express = require("express");
const routes =  express.Router();
const productSettingControllers  = require('../controllers/productSetting')
const verifyToken = require('../middleware/auth');



// Get All Products Setting using this route - complete testing ✔✔✔
routes.get("/Products/setting",productSettingControllers.getAllProductsSetting);




module.exports = routes