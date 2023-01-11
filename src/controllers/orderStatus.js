const mongoose = require("mongoose");
const OrderStatus = require("../models/OrderStatus");
const  OrderStatusSchema = mongoose.model("ordersstatus",OrderStatus);



// Get All OrderStatus Method 
const getAllOrdersStatus = (req,res) => {
    OrderStatusSchema.find({} ,function(err,data) {
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

module.exports = { getAllOrdersStatus }