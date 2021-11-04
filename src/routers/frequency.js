const express = require("express");
const Frequency = require("../models/frequency");
const Product = require("../models/product");

/**
 * Controllers
 */

const addNewFrequency = async (req, res) => {
  const top = req.body.top;
  const bottom = req.body.bottom;

  try {
    const topProduct = await Product.findById(top);
    const bottomProduct = await Product.findById(bottom);

    const freq = new Frequency({
      type_1: topProduct.type,
      sub_type_1: topProduct.sub_type,
      color_1: topProduct.color,
      type_2: bottomProduct.type,
      sub_type_2: bottomProduct.sub_type,
      color_2: bottomProduct.color,
    });

    const prev_freq = await Frequency.findOneAndUpdate(
      {
        type_1: freq.type_1,
        sub_type_1: freq.sub_type_1,
        color_1: freq.color_1,
        type_2: freq.type_2,
        sub_type_2: freq.sub_type_2,
        color_2: freq.color_2,
      },
      { $inc: { count: 1 } }
    );

    if (!prev_freq) await freq.save();

    res.status(201).send();
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
};

const getRecommendations = async (req, res) => {
  const id = req.query.id;

  try {
    const product = await Product.findById(id);

    const recommendations = await Frequency.findMatch(
      product.type,
      product.sub_type,
      product.color
    );

    res.status(200).send(recommendations);
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
};

/**
 * Router
 */

const router = new express.Router();

router.post("/buy", addNewFrequency);

router.get("/recommendations", getRecommendations);

module.exports = router;
