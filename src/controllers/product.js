const mongoose = require("mongoose");
const Product = require("../models/Product");
const ProductSchema = mongoose.model("products", Product);
const fs = require("fs");
const HttpResponse = require('../models/HttpResponse');

// Get All Products Method
const getAllProducts = async (req, res) => {
  try {
    const products = await ProductSchema.find()
        .sort({ createdAt: req.query.sort === 'DESC' ? -1 : 1 })
        .skip(((parseInt(req.query.page) || 1) - 1) * (parseInt(req.query.pageSize) || 10))
        .limit(parseInt(req.query.pageSize) || 5);

    let response;
    if (products.length < 1) response = new Pagination(null, 1, 404, "No record found", null);
    response = new Pagination(null, 1, 200, "Successfully", products);
    return res.status(response.status).json(response);
  } catch (error) {
    response = new Pagination(null, 0, 500, "Internal Server Error", null);
    return res.status(response.code).json(response);
  }
}



//  Save or Update Method

const postProduct = async (req, res) => {
  console.log(res)
  try {
    const data = new ProductSchema({
      ProductName: req.body.ProductName,
      ProductPrice: req.body.ProductPrice,
      ProductQuantity: req.body.ProductQuantity,
      ProductDescription: req.body.ProductDescription,
      ProductCode: req.body.ProductCode,
      ProductEstimate: req.body.ProductEstimate,
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
            ProductEstimate: data.ProductEstimate,
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
const deleteProduct = async (req, res) => {
  try {
    const productCode = req.params.ProductCode;
    response = new HttpResponse(null, 1, 200, "Successfully", await ProductSchema.findOneAndDelete({ ProductCode: productCode }, (err, res)));
    deleteImageFromSource(res.ProductImage);
    return res.status(response.status).json(response);
  } catch (error) {
    response = new HttpResponse(null, 0, 500, "Internal Server Error", null);
    return res.status(response.code).json(response);
  }
};

function deleteImageFromSource(aar) {
  cutString = cutString.slice(8, aar.length);
  res.send(cutString);
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


// Get data By Id
const dataById = async (req, res) => {
  try {
    const product = await ProductSchema.findOne({ ProductCode: req.params.ProductCode });
    let response;
    if (Object.keys(product).length === 0) response = new HttpResponse(null, 1, 404, "No record found", null);
    else response = new HttpResponse(null, 1, 200, "Successfully", product);
    return res.status(response.status).json(response);
  } catch (error) {
    response = new HttpResponse(null, 0, 500, "Internal Server Error", null);
    return res.status(response.code).json(response);
  }
}
module.exports = {
  getAllProducts,
  postProduct,
  deleteProduct,
  dataById,
};
