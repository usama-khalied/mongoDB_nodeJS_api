const mongoose = require("mongoose");
const order = require("../models/order");
const OrderSchema = mongoose.model("NEWCOL", order);

// Get All Data Method
const getAllOrders = (req, res) => {
  OrderSchema.find({}, function (err, data) {
    if (err) {
      res.send("ERROR ID");
    } else {
      if (data.length == 0) {
        res.send("Nothing found id");
      } else {
        res.send(data);
      }
    }
  });
};

// Update Order Method
const updatOrder = (req, res) => {
  let updateName = req.body.name;
  let updateEmail = req.body.email;
  let updatePhone = req.body.phone;
  let updateAddress = req.body.address;
  let updateOid = req.body.oid;
  let updatePrice = req.body.price;
  let updateQty = req.body.qty;
  let currentDate = req.body.currentDate;
  let updateStatus = req.body.status;
  OrderSchema.findOneAndUpdate(
    {
      oid: updateOid,
    },
    {
      $set: {
        name: updateName,
        email: updateEmail,
        phone: updatePhone,
        address: updateAddress,
        price: updatePrice,
        qty: updateQty,
        currentDate: currentDate,
        status: updateStatus,
      },
    },
    { new: true },
    (err, data) => {
      if (err) {
        res.send("ERROR");
      } else {
        if (data == null) {
          res.send("nothing found");
        } else {
          res.send(data);
        }
      }
    }
  );
};

// Gt Order By Id
const getOrderById = (req, res) => {
  fetchID = req.params.oid;
  OrderSchema.findOne({ oid: fetchID }, function (err, val) {
    if (err) {
      res.send("ERROR");
    } else {
      if (val.length == 0) {
        res.send("nothing found");
      } else {
        res.send(val);
      }
    }
  });
};

// Delete Order By ID
const delByOrderId = (req, res) => {
  let DelId = req.params.oid;
  OrderSchema.findOneAndDelete({ oid: DelId }, function (err, docs) {
    if (err) {
      res.send("ERROR");
    } else {
      if (docs == null) {
        res.send("WRONG ID");
      } else {
        res.send("Deleted");
      }
    }
  });
};
const postOrder = async (req, res) => {
  const data = new OrderSchema({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    oid: req.body.oid,
    price: req.body.price,
    qty: req.body.qty,
    currentDate: req.body.currentDate,
    status: req.body.status,
  });
  const val = await data.save();
  res.send(data);
};
module.exports = {
  getAllOrders,
  updatOrder,
  getOrderById,
  delByOrderId,
  postOrder,
};
