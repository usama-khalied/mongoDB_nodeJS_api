const mongoose = require("mongoose");
const Product = require("../models/Product");
const ProductSchema = mongoose.model("products", Product);
const path = require('path');




// Get All OrderStatus Method
const getAllProducts = (req, res) => {
  try {
    ProductSchema.find({}, function (err, data) {
      if (err) {
        return res.send("ERROR ID");
      } else {
        if (data.length == 0) {
          return res.send("Nothing found id");
        }

        res.send(data);
      }
    });
  } catch (error) {
    res.status.json({ message: "Request is not delivered" });
  }

};

const postProduct = async (req, res) => {
  // const {ProductName , ProductPrice , ProductQuantity , ProductImage , ProductDescription , ProductCode} = req.body
  try {
    // const data = new ProductSchema({
    //   ProductName:ProductName,
    //   ProductPrice:ProductPrice,
    //   ProductQuantity:ProductQuantity,
    //   ProductImage:ProductImage,
    //   ProductDescription:ProductDescription,
    //   ProductCode:ProductCode
    // });
       const data = new ProductSchema({
      ProductName:req.body.ProductName,
      ProductPrice:req.body.ProductPrice,
      ProductQuantity:req.body.ProductQuantity,
      ProductDescription:req.body.ProductDescription,
      ProductCode:req.body.ProductCode
    });
    if(req.file) {
         data.ProductImage = req.file.path
    }
    const val = await data.save();
    // res.send(val);
      res.send(val)    
  } catch (error) {
    res.status(204).json({ message: "Data Not found" });
  }
};

module.exports = {
  getAllProducts,
  postProduct
};
