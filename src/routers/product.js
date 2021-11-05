const express = require("express");
const Product = require("../models/product");
const chalk = require("chalk");

/**
 * Controllers
 */

const createProduct = async (req, res) => {
  const product = new Product({ ...req.body });

  try {
    await product.save();
    res.status(201).send(product);
  } catch (e) {
    console.error(chalk.red(e));
    res.status(400).send(e);
  }
};

const getProduct = async (req, res) => {
  const id = req.query.id;
  try {
    const product = await Product.findById(id);
    res.status(200).send(product);
  } catch (e) {
    console.error(chalk.red(e));
    res.status(500).send(e);
  }
};

const getAllProducts = async (req, res) => {
  const type = req.query.type;
  const color = req.query.color;

  let limit = parseInt(req.query.limit);
  let skip = parseInt(req.query.skip);
  if (!limit) limit = 0;
  if (!skip) skip = 20;

  try {
    let products = [];

    if (type) {
      if (color) {
        products = await Product.find({ type, color });
      } else {
        products = await Product.find({ type });
      }
    } else {
      products = await Product.find();
    }

    const final = products
      .reverse()
      .slice(
        Math.min(limit, products.length),
        Math.min(limit + skip, products.length)
      );

    console.log(final.length);

    res.status(200).send({ products: final, total: products.length });
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};

/**
 * Router
 */

const router = new express.Router();

router.post("/product", createProduct);

router.get("/product", getProduct);

router.get("/products", getAllProducts);

module.exports = router;
