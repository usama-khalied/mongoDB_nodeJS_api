const mongoose = require("mongoose");
const ProductsSetting = require("../models/ProductsSetting");
const ProductsSettingSchema = mongoose.model("productssetting", ProductsSetting);
const HttpResponse = require('../models/HttpResponse');

// Get All OrderStatus Method 
const getAllProductsSetting = async (req, res) => {
    try {
        const productSettings = await ProductsSettingSchema.find()
        let response;
        if (productSettings.length < 1) response = new HttpResponse(null, 1, 404, "No record found", null);
        response = new HttpResponse(null, 1, 200, "Successfully", productSettings);
        return res.status(response.status).json(response);
    } catch (error) {
        response = new HttpResponse(null, 0, 500, "Internal Server Error", null);
        return res.status(response.code).json(response);
    }
}

module.exports = { getAllProductsSetting }