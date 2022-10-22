const express = require("express");
const app = express();
require('dotenv').config()
require('./config/DatabaseConnctions');
const orderRoutes = require('./routes/order')
const cors = require('cors');
const router =  express.Router()
const port = process.env.PORT



app.use(express.json());
app.use(cors())
app.use(orderRoutes)

const OrderSchema = require("./models/order").OrderSchema;




// post operation User Start
app.post("/post",async(req,res) => {
    console.log("inside post function");
    const data = new OrderSchema({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        address:req.body.address,
        oid:req.body.oid,
        price:req.body.price,
        qty:req.body.qty,
        currentDate:req.body.currentDate
    });
    const val = await data.save();
    res.send(data)
});

// post operation User End






// Get Operation User Start
app.get('/view',(req,res) => {
    res.send("Hellow world");
});
// Get Operation User End


// Update Operation User Start
app.put('/update/:oid',async(req,res) => {
     let updateName = req.body.name;
     let updateEmail = req.body.email;
     let updatePhone = req.body.phone;
     let updateAddress = req.body.address;
     let updateOid     = req.body.oid;
     let updatePrice = req.body.price;
     let updateQty = req.body.qty;
     let currentDate = req.body.currentDate;
     OrderSchema.findOneAndUpdate({
        oid:updateOid
     },{$set:{
        name:updateName,
        email:updateEmail,
        phone:updatePhone,
        address:updateAddress,
        price:updatePrice,
        qty:updateQty,
        currentDate:currentDate
    }}
     ,{new:true},(err,data) => {
        if(err) {
            res.send("ERROR")
        }
        else {
            if(data==null){
                res.send("nothing found");
              }
              else {
                 res.send(data)
              }
        }
     })
});
// Update Operation User End




// Get Operation User FetchID Start
app.get("/fetch/:oid",(req,res) => {
    fetchID = req.params.oid;

    OrderSchema.find(({OID:fetchID}), function(err,val){
        // res.send("Hellow")
        if(err) {
            res.send("ERROR")
        }
        else {
            if(val.length==0){
                res.send("nothing found");
              }
              else {
                 res.send(val)
              }
        }
    })
})
// Get Operation User FetchID End


// Delete Operation User DeleteID Start
app.delete('/del/:oid',function (req,res) {
let DelId = req.params.oid;
OrderSchema.findOneAndDelete(({oid:DelId}),function(err,docs){
    if(err) {
        res.send("ERROR");
    }
    else {

        if(docs==null) {
            res.send("WRONG ID")
            }
            else {
                res.send("Deleted");
            }
    }
})
});
// Delete Operation User DeleteID End


// Get Product All data Start
// app.get("/getAllProductsData",(req,res) => {
//     OrderSchema.find({} ,function(err,data) {
//         if(err) {
//             res.send("ERROR ID")
//         }
//         else {
//             if(data.length == 0) {
//                 res.send("Nothing found id")
//             }
//             else {
//                 res.send(data)
//             }
//         }
//     })
// });
// Get Product All data Start
app.listen(port,() => {
    console.log(`on port ${port}`)
});