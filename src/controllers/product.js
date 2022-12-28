const mongoose = require("mongoose");
const Product = require("../models/Product");
const ProductSchema = mongoose.model("products", Product);
const path = require("path");

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
  try {
    const data = new ProductSchema({
      ProductName: req.body.ProductName,
      ProductPrice: req.body.ProductPrice,
      ProductQuantity: req.body.ProductQuantity,
      ProductDescription: req.body.ProductDescription,
      ProductCode: req.body.ProductCode,
    });
    const existingProduct = await ProductSchema.findOne({
      ProductCode: data.ProductCode,
    });
    if (!existingProduct) {
      if (req.file) {
        data.ProductImage = req.file.path;
      }
      const val = await data.save();
      res.send(val);
    } else {
      ProductSchema.findOneAndUpdate(
        {
          ProductCode: data.ProductCode,
        },
        {
          $set: {
            ProductName: data.ProductName,
            ProductPrice: data.ProductPrice,
            ProductQuantity: data.ProductQuantity,
            ProductDescription: data.ProductDescription,
            ProductCode: data.ProductCode,
            ProductImage: req.file.path,
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
    }
  } catch (error) {
    res.status(204).json({ message: "Data Not found" });
  }
};

module.exports = {
  getAllProducts,
  postProduct,
};
