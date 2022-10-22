const mongoose = require("mongoose");
const Order = {
    name:String,
    email:String,
    phone:String,
    address:String,
    oid:Number,
    price:Number,
    qty:Number,
    currentDate:String,
}
const OrderSchema = mongoose.model("NEWCOL",Order);
module.exports = OrderSchema