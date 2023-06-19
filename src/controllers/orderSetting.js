const mongoose = require("mongoose");
const OrderSetting = require("../models/OrderSetting");
const  OrderSettingSchema = mongoose.model("ordersetting",OrderSetting);



// Get All OrderStatus Method 
const getAllOrdersSetting = (req,res) => {
    OrderSettingSchema.find({} ,function(err,data) {
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

module.exports = { getAllOrdersSetting }