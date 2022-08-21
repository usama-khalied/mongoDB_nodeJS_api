const express = require("express");
const app = express();
const mongoose = require("mongoose");
var cors = require('cors');
app.use(express.json());
app.use(cors())

// Connect operation
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

const conn = mongoose.createConnection('mongodb://localhost/testA', {
    useNewUrlParser:true,
    useUnifiedTopology:true
}, (err) => {
    if(!err) {
        console.log("Data ID is  connected");
    }
    else {
        console.log("Data ID is not connected ")
    }
});


// Creating schema
const sch = {
    name:String,
    email:String,
    phone:String,
    address:String,
    oid:Number,
    price:Number,
    qty:Number
}
const sch2 = {
    genearateID:Number
}
const monmodelId = mongoose.model("DataId",sch2);
const monmodel = mongoose.model("NEWCOL",sch);


// post operation
app.post("/post",async(req,res) => {
    console.log("inside post function");
    const data = new monmodel({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        address:req.body.address,
        oid:req.body.oid,
        price:req.body.price,
        qty:req.body.qty
    });
    const val = await data.save();
    res.send(data)
});
app.listen(4000,() => {
    console.log("on Port 3000")
});



// Post ID
app.post("/postid",async(req,res) => {
    console.log("inside post id function");
    const data1 = new monmodelId({
        genearateID: req.body.genearateID
    });
    const val1 = await data1.save();
    res.send(data1)
});
app.listen(3000,() => {
    console.log("on Port 3000 ID")
});








// get method
app.get('/view',(req,res) => {
    res.send("Hellow world");
});
app.get('/viewid',(req,res) => {
    res.send("data1")
});

// put method
app.put('/update/:oid',async(req,res) => {
     let updateName = req.body.name;
     let updateEmail = req.body.email;
     let updatePhone = req.body.phone;
     let updateAddress = req.body.address;
     let updateOid     = req.body.oid;
     let updatePrice = req.body.price;
     let updateQty = req.body.qty;
     monmodel.findOneAndUpdate({
        oid:updateOid
     },{$set:{
        name:updateName,
        email:updateEmail,
        phone:updatePhone,
        address:updateAddress,
        price:updatePrice,
        qty:updateQty,
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

// Fetch mathod
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

// Delete Method
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

})

