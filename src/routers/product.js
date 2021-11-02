const express = require("express");
const Product = require("../models/product");

const router = new express.Router();

router.post("/product", async (req, res) => {
  const product = new Product({ ...req.body });

  try {
    await product.save();
    res.status(201).send(product);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/products", async (req, res) => {
  const type = req.query.type;
  const color = req.query.color;

  const limit = parseInt(req.query.limit) ?? 0;
  const skip = parseInt(req.query.skip) ?? 20;

  try {
    let products = [];

    if (type) {
      if (color) {
        products = await Product.find({ type, color });
      } else {
        products = await Product.find({ type });
      }
    }

    const final = products.slice(limit, min(limit + skip, products.length));
    res.status(201).send(final);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
