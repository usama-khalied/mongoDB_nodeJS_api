const mongoose = require("mongoose");
const ProductsSetting = require("../models/ProductsSetting");
const  ProductsSettingSchema = mongoose.model("productssetting",ProductsSetting);


// Get All OrderStatus Method 
const getAllProductsSetting = (req,res) => {
    ProductsSettingSchema.find({} ,function(err,data) {
        if(err) {
            res.send("ERROR ID")    
        }
        else {
            if(data.length == 0) {
                res.send("Nothing found id")
            }
            else {
                res.send(data)
            }
        }
    })
}

module.exports = { getAllProductsSetting }