const mongoose = require("mongoose");
const Order = require("../models/Order");
const OrderSchema = mongoose.model("Orders", Order);
const HttpResponse = require('../models/HttpResponse');
const Pagination  = require('../models/Pagination')
// 
// Author Usama
// 

// GET All Data Method
const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderSchema.find()
      .sort({ createdAt: req.query.sort === 'DESC' ? -1 : 1 })
      .skip(((parseInt(req.query.page) || 1) - 1) * (parseInt(req.query.pageSize) || 10))
      .limit(parseInt(req.query.pageSize) || 5);
    let response;
    if (orders.length < 1) response = new Pagination(null, 1, 404, "No record found", null);
    response = new Pagination(null, 1, 200, "Successfully", orders, Number(req.query.pageSize), Number(req.query.page), req.query.sort === 'DESC' ? -1 : 1, orders.length);
    return res.status(response.status).json(response);
  } catch (error) {
    response = new Pagination(null, 0, 500, "Internal Server Error", null);
    return res.status(response.code).json(response);
  }
}

// UPDATE Order Method
const updatOrder = async (req, res) => {
  try {
    let response;
    let updateName = req.body.name;
    let updateEmail = req.body.email;
    let updatePhone = req.body.phone;
    let updateAddress = req.body.address;
    let updateOid = req.body.oid;
    let updatePrice = req.body.price;
    let updateQty = req.body.qty;
    let currentDate = req.body.currentDate;
    let updateStatus = req.body.status;
    let updateproduct = req.body.product;
    let order = await OrderSchema.findOneAndUpdate(
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
          product: updateproduct,
        },
      },
      { new: true });
    if (order.length < 1) response = new HttpResponse(null, 1, 404, "No record found", null);
    response = new HttpResponse(null, 1, 200, "Successfully", order);
    return res.status(response.status).json(response);
  } catch (error) {
    response = new HttpResponse(null, 0, 500, "Internal Server Error", null);
    return res.status(response.code).json(response);
  }

}

// Gt Order By Id
const getOrderById = async (req, res) => {
  try {
    const Id = req.params.oid;
    const order = await OrderSchema.findOne({ oid: Id });
    let response;
    if (order.length < 1) response = new HttpResponse(null, 1, 404, "No record found", null);
    response = new HttpResponse(null, 1, 200, "Successfully", order);
    return res.status(response.status).json(response);
  } catch (error) {
    response = new HttpResponse(null, 0, 500, "Internal Server Error", null);
    return res.status(response.code).json(response);
  }
};

// DELETE Order By ID
const delByOrderId = async (req, res) => {
  try {
    const Id = req.params.oid;
    const order = await OrderSchema.findOneAndDelete({ oid: Id });
    let response;
    if (order.length < 1) response = new HttpResponse(null, 1, 404, "No record found", null);
    response = new HttpResponse(null, 1, 200, "Successfully", order);
    return res.status(response.status).json(response);
  } catch (error) {
    response = new HttpResponse(null, 0, 500, "Internal Server Error", null);
    return res.status(response.code).json(response);
  }
};

//  POST
const postOrder = async (req, res) => {
  try {
    const orders = await OrderSchema.find();
    let oId = orders.length + 1;
    let response;
    const data = new OrderSchema({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      oid: oId,
      price: req.body.price,
      qty: req.body.qty,
      currentDate: req.body.currentDate,
      status: req.body.status,
      product: req.body.product,
    });
    const order = await data.save();
    response = new HttpResponse(null, 1, 200, "Successfully", order);
    return res.status(response.status).json(response);
  } catch (error) {
    console.error(error);
    response = new HttpResponse(null, 0, 500, "Internal Server Error", null);
    return res.status(response.code).json(response);
  }
};



const getDashboard = async (req, res) => {

  try {
    let response;
    const orders = await OrderSchema.find();
    if (orders.length < 1) response = new HttpResponse(null, 1, 404, "No record found", null); else {
      const [processList, pendingList, deliveredList] = [
        orders.filter((e) => e.status === "Process"),
        orders.filter((e) => e.status === "Pending"),
        orders.filter((e) => e.status === "Delivered"),
      ];
      const dashboardList = [
        new Dashboard("Process", processList.length),
        new Dashboard("Pending", pendingList.length),
        new Dashboard("Delivered", deliveredList.length),
      ];
      response = new HttpResponse(null, 1, 200, "Successfully", dashboardList);
      return res.status(response.status).json(response);
    }
  } catch (error) {
    response = new HttpResponse(null, 0, 500, "Internal Server Error", null);
    return res.status(response.code).json(response);
  }
};




// Order length for using  Dashboard Chart - Close

module.exports = {
  getAllOrders,
  updatOrder,
  getOrderById,
  delByOrderId,
  postOrder,
  getDashboard,
};

class Dashboard {
  constructor(name, value) {
    this.name = name;
    this.value = value;
  }
}
