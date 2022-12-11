const mongoose = require("mongoose");
const Product = require("../models/Product");
const  ProductSchema  = mongoose.model("products",Product);


// Get All OrderStatus Method 
const getAllProducts = (req,res) => {
try {
    OrderStatusSchema.find({} ,function(err,data) {
        if(err) {
          return res.send("ERROR ID")    
        }
        else {
            if(data.length == 0) {
             return    res.send("Nothing found id")
            }
        
            res.send(data)
            
        }
    })
} catch (error) {
    res.status.json({message:"Request is not delivered"})
}
}