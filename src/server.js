const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

require("./database/mongoose");
require("./tensorflow/tf");
const frequencyRouter = require("./routers/frequency");
const productRouter = require("./routers/product");

const app = express();

// Middlewares
app.use(express.json());
app.use(frequencyRouter);
app.use(productRouter);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// app.use("/static", express.static(path.join(__dirname, "static")));
// app.use(express.static(path.join(__dirname, "static")));

app.use(morgan("dev"));
app.use(cors());

module.exports = app;
