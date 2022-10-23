const mongoose = require("mongoose");
const order = require("../models/order");
const  OrderSchema = mongoose.model("NEWCOL",order);

const getAllOrders = (req,res) => {
    OrderSchema.find({} ,function(err,data) {
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

module.exports = {getAllOrders}