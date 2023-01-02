const mongoose = require("mongoose");
const Product = require("../models/Product");
const ProductSchema = mongoose.model("products", Product);
const path = require("path");
const fs = require("fs");

// Get All Products Method
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

//  Save or Update Method
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
// Delete Request
const deleteProduct = (req, res) => {
  let productCodeForDelete = req.params.ProductCode;
  ProductSchema.findOneAndDelete(
    { ProductCode: productCodeForDelete },
    function (err, docs) {
      if (err) {
        res.send("ERROR");
      } else {
        if (docs == null) {
          res.send("WRONG ID");
        } else {
          let cutString = docs.ProductImage;
          cutString = cutString.slice(8, cutString.length);
          res.send(cutString);
          // const fileName = docs.ProductCode;
          let imagePath = process.cwd();
          const directoryPath = imagePath + "/uploads/";

          try {
            fs.unlinkSync(directoryPath + cutString);

            res.status(200).send({
              message: "File is deleted.",
            });
          } catch (err) {
            res.status(500).send({
              message: "Could not delete the file. " + err,
            });
          }
        }
      }
    }
  );
};

module.exports = {
  getAllProducts,
  postProduct,
  deleteProduct,
};
