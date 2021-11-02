const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

require("./db/mongoose");
const frequencyRouter = require("./routers/frequency");
const productRouter = require("./routers/product");

const app = express();

// Middlewares
app.use(express.json());
app.use(frequencyRouter);
app.use(productRouter);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.REACT_URL);
  next();
});

app.use(morgan("dev"));
app.use(cors());

module.exports = app;
