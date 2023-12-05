const express = require("express");
const routes =  express.Router();
const orderControllers  = require('../controllers/order')
const orderStatusController = require('../controllers/orderStatus')
// Middleware for api authentication
const verifyToken = require('../middleware/auth');

// Get All Orders Status using this route 
routes.get('getOrdersStatus',verifyToken,orderStatusController.getAllOrdersStatus)

// Get All Orders using this route - complete testing ✔✔✔
// routes.get("/Orders/getAllOrdersData",verifyToken,orderControllers.getAllOrders);
routes.get("/Orders/getAllOrdersData",orderControllers.getAllOrders);


// ready for authentication auth function 👇👇👇
// routes.get("/getAllOrdersData",verifyToken,orderControllers.getAllOrders);


// Post Method using this route - complete testing ✔✔✔
routes.post("/postData",orderControllers.postOrder);

// Update Method using this route - complete testing ✔✔✔
routes.put("/updateOrder/:oid",orderControllers.updatOrder);

// Get Order By Id using this route - complete testing ✔✔✔
routes.get("/fetchOrder/:oid",verifyToken,orderControllers.getOrderById);

// Get Order By OrderID using this route  - complet testing ✔✔✔
routes.delete("/del/:oid",verifyToken,orderControllers.delByOrderId);

routes.get('/getDashboard',orderControllers.getDashboard);

module.exports = routes