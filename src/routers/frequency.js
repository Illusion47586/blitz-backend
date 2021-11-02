const express = require("express");
const Frequency = require("../models/frequency");
const Product = require("../models/product");

const router = new express.Router();

router.post("/buy", async (req, res) => {
  const top = req.body.top;
  const bottom = req.body.bottom;

  try {
    const topProduct = await Product.findById(top);
    const bottomProduct = await Product.findById(bottom);

    const freqIO = new Frequency({
      input_type: topProduct.type,
      input_sub_type: topProduct.sub_type,
      input_color: topProduct.color,
      output_type: bottomProduct.type,
      output_sub_type: bottomProduct.sub_type,
      output_color: bottomProduct.color,
    });

    const freqOI = new Frequency({
      input_type: bottomProduct.type,
      input_sub_type: bottomProduct.sub_type,
      input_color: bottomProduct.color,
      output_type: topProduct.type,
      output_sub_type: topProduct.sub_type,
      output_color: topProduct.color,
    });

    await freqIO.save();
    await freqOI.save();

    res.status(200).send();
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/recommendations", async (req, res) => {
  const id = req.query.id;

  try {
    const product = Product.findById(id);

    const recommendations = await Frequency.findMatch(
      product.type,
      product.sub_type,
      product.color
    );

    res.status(201).send(recommendations);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
