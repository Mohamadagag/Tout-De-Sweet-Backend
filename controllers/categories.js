const express = require("express");
const Category = require("../models/category");

class Controller {
  async AllCategories(req, res, next) {
    Category.find({}, (error, response) => {
      if (error) return next(error);
      res.send(response);
    });
  }

  async OneCategory(req, res, next) {
    let { id } = req.params;
    Category.findById(id, (error, result) => {
      if (error) return next(error);
      res.send(result);
    });
  }

  async post(req, res, next) {
    let newCategory = new Category({
      name: req.body.name,
    });

    await newCategory.save({}, (error, response) => {
      if (error) return next(error);
      res.send(response);
    });
  }

  async UpdateCategory(req, res, next) {
    const newCategory = {
      name: req.body.name,
    };
    let { id } = req.params;

    Category.updateOne(
      { _id: id },
      { $set: newCategory },
      (error, response) => {
        if (error) return next(error);
        res.send(response);
      }
    );
  }

  async deleteCategory(req, res, next) {
    let { id } = req.params;
    Category.deleteOne({ _id: id }, (error, response) => {
      if (error) return next(error);
      res.send(response);
    });
  }
}

const controller = new Controller();
module.exports = controller;
