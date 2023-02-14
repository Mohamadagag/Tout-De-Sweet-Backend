const { Schema, model } = require("mongoose");

const ProductSchema = new Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  image: {
    type: Array,
  },
  linkButton: {
    type: String,
    required: true,
  },
  categories: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
});

const Product = model("Product", ProductSchema);
module.exports = Product;
