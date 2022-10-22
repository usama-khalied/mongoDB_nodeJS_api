const express = require("express");
const routes = express.Router();
const OrderSchema = require("../models/order").OrderSchema;
require('../config/DatabaseConnctions');

routes.get("/getAllProductsData",(req,res) => {
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
});

module.exports = routes