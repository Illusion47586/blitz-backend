const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

require("./database/mongoose");
const frequencyRouter = require("./routers/frequency");
const productRouter = require("./routers/product");
const { router: cloudinaryRouter } = require("./routers/cloudinary");

const app = express();

// Middlewares
app.use(express.json());
app.use(frequencyRouter);
app.use(productRouter);
app.use(cloudinaryRouter);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.REACT_URL);
  next();
});

// app.use("/static", express.static(path.join(__dirname, "static")));
// app.use(express.static(path.join(__dirname, "static")));

app.use(morgan("dev"));
app.use(cors());

module.exports = app;
