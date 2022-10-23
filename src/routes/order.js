const express = require("express");
const routes =  express.Router();
const orderControllers  = require('../controllers/order')



// Get All Orders using this route - complete testing ✔✔✔
routes.get("/getAllOrdersData",orderControllers.getAllOrders);

// Post Method using this route - complete testing ✔✔✔
routes.post("/postData",orderControllers.postOrder);

// Update Method using this route - complete testing ✔✔✔
routes.put("/updateOrder/:oid",orderControllers.updatOrder);

// Get Order By Id using this route - complete testing ✔✔✔
routes.get("/fetchOrder/:oid",orderControllers.getOrderById);

// Get Order By OrderID using this route  - complet testing ✔✔✔
routes.delete("/del/:oid",orderControllers.delByOrderId);



module.exports = routes