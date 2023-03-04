const Product = require("../models/product");
const Category = require("../models/category");

class Controller {
  async getAllProducts(req, res, next) {
    let ids = [];
    const categ = await Category.find({}, { _id: 1 });

    categ.forEach((cat) => {
      ids.push(cat._id);
    });

    let cat = req.query.cat;
    let query = cat !== "" ? cat : ids;

    Product.find({ categories: query }, (error, response) => {
      if (error) return next(error);
      res.send({ response });
    }).populate("categories");
  }

  async fetchProducts(req, res, next) {
    Product.find({}, (error, response) => {
      if (error) return next(error);
      res.send({ response });
    }).populate("categories");
  }

  async lastFour(req, res) {
    Product.find()
      .sort({ _id: -1 })
      .limit(7)
      .exec(function (error, response) {
        if (error) return next(error);
        res.status(200).send({ response });
      });
  }

  async randomFive(req, res) {
    Product.count().exec(function (err, count) {
      var random = Math.floor(Math.random() * count);
      Product.find()
        .skip(random)
        .limit(7)
        .exec(function (error, response) {
          if (error) return next(error);
          res.status(200).send({ response });
        });
    });
  }

  async getOneProduct(req, res, next) {
    let { id } = req.params || {};
    Product.findById(id)
      .populate("categories")
      .exec(function (err, response) {
        if (err) return next(err);
        res.status(200).send({ response });
      });
  }

  async post(req, res, next) {
    const reqFiles = [];
    const url = req.protocol + "://" + req.get("host");
    for (var i = 0; i < req.files.length; i++) {
      reqFiles.push(url + "/images/" + req.files[i].filename);
    }

    let newProduct = new Product({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      categories: req.body.categories,
      linkButton: req.body.linkButton,
      image: reqFiles,
    });
    newProduct.save({}, (error, result) => {
      if (error) return next(error);
      res.send(result);
      console.log("res ", result);
    });
  }
}

const controller = new Controller();
module.exports = controller;
