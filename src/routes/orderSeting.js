const express = require("express");
const routes =  express.Router();
const orderSettingControllers  = require('../controllers/orderSetting')
const verifyToken = require('../middleware/auth');



// Get All Orders Setting using this route - complete testing ✔✔✔
routes.get("/Orders/setting",verifyToken,orderSettingControllers.getAllOrdersSetting);




module.exports = routes