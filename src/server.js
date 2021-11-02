const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const { readdirSync } = require("fs");

const nodemailer = require("nodemailer");
require("dotenv").config();

// app

const app = express();

// db

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connection established");
  })
  .catch((err) => console.log(`DB CONNECTION ERROR ${err}`));

// middlewares

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.REACT_URL);
  next();
});

app.use(morgan("dev"));
app.use(cors());

// routes middleware

readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));

// port

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server running on port: ${port}`));
