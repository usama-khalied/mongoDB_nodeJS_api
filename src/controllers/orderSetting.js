const mongoose = require("mongoose");
const OrderSetting = require("../models/OrderSetting");
const OrderSettingSchema = mongoose.model("ordersetting", OrderSetting);
const HttpResponse = require('../models/HttpResponse');

// Get All OrderStatus Method 
const getAllOrdersSetting = async (req, res) => {
    try {
        const orderSettings = await OrderSettingSchema.find()
        let response;
        if (orderSettings.length < 1) response = new HttpResponse(null, 1, 404, "No record found", null);
        response = new HttpResponse(null, 1, 200, "Successfully", orderSettings);
        return res.status(response.status).json(response);
    } catch (error) {
        response = new HttpResponse(null, 0, 500, "Internal Server Error", null);
        return res.status(response.code).json(response);
    }
}

module.exports = { getAllOrdersSetting }