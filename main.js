
const express = require("express");
const app = express();
var cors = require('cors');
var router =  express.Router()
app.use(express.json());
app.use(cors())
const mongoose = require("mongoose");


const sch = require("./asset/user");
const sch2 = require("./asset/userID")


// Connect operation Start Part 1
mongoose.connect("mongodb://localhost:27017/mynewdb",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}, (err) => {
     if(!err) {
        console.log("Database is connected");
     }
     else {
        console.log("Db is not connected")
     }
});
// Connect operation Close Part 1





// connecting Module to Schema Start

const monmodel = mongoose.model("NEWCOL",sch);
// connecting Module to Schema End


// post operation User Start
app.post("/post",async(req,res) => {
    console.log("inside post function");
    const data = new monmodel({
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
app.listen(4000,() => {
    console.log("on Port 3000")
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
     monmodel.findOneAndUpdate({
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

    monmodel.find(({OID:fetchID}), function(err,val){
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
let delID = req.params.oid;
monmodel.findOneAndDelete(({oid:delID}),function(err,docs){
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
app.get("/getAllProductsData",(req,res) => {
    monmodel.find({} ,function(err,data) {
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
// Get Product All data Start
