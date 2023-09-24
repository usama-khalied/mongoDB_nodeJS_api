const mongoose = require("mongoose");
const OrderStatus = require("../models/OrderStatus");
const OrderStatusSchema = mongoose.model("ordersstatus", OrderStatus);
const HttpResponse = require('../models/HttpResponse');


// Get All OrderStatus Method 
const getAllOrdersStatus = async (req, res) => {
    try {
        const orderStatus = await OrderStatusSchema.find();
        let response;
        if (orderStatus.length < 1) response = new HttpResponse(null, 1, 404, "No record found", null);
        response = new HttpResponse(null, 1, 200, "Successfully", orderStatus);
        return res.status(response.status).json(response);
    } catch (error) {
        response = new HttpResponse(null, 0, 500, "Internal Server Error", null);
        return res.status(response.code).json(response);
    }
}

module.exports = { getAllOrdersStatus }