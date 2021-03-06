const express = require("express");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const chalk = require("chalk");
const Frequency = require("../models/frequency");
const axios = require("axios").default;

// console.log(cloudinary.config().cloud_name);

/**
 * Controllers
 */

const upload = async (base64) => {
  // Create image from base64
  if (!fs.existsSync("temp/"))
    fs.mkdir("temp", (err) => {
      if (err) console.error(chalk.red(err));
      else console.log(chalk.bgMagenta("Temp folder created"));
    });
  const filename = `${Math.floor(Math.random() * 1000)}${Math.floor(
    Math.random() * 1000
  )}${Math.floor(Math.random() * 1000)}.png`;
  const location = "temp\\" + filename;
  fs.writeFile(location, base64, "binary", (err) => {
    if (err) {
      console.error(chalk.red(err));
      deleteImage(location);
    } else console.log(chalk.bgBlueBright(`Image saved: ${location}`));
  });

  // Upload image
  const res = await cloudinary.uploader.upload(location, {
    public_id: filename.split(".")[0],
    format: "png",
  });

  // Delete image
  deleteImage(location);
  return res.url;
};

const deleteImage = async (filename) => {
  fs.unlink(filename, (err) => {
    if (err) console.error(chalk.red(err));
    else console.log(chalk.yellow(`${filename} was deleted`));
  });
};

/**
 * Router
 */

const router = express.Router();

router.post("/upload", async (req, res) => {
  try {
    // console.log(req.body.image);
    // const binary = Buffer.from(req.body, "binary");
    const result = await upload(req.body.image);
    if (result) res.status(201).send(result);
    else res.status(500).send();
  } catch (e) {
    console.error(e);
    res.status(500).send();
  }
});

router.post("/upload-and-recommendation", async (req, res) => {
  try {
    const result = await upload(req.body.image);
    const { type, subType, color } = await axios.get(
      process.env.TF_URL + "/get-tags?url=" + result
    );
    const recommendations = await Frequency.findMatch(type, subType, color);
    res.status(200).send(recommendations);
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
});

module.exports = { router, upload };
