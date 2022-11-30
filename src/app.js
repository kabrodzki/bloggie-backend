const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();

const postRoute = require("./routes/post.route");

const app = express();

const corsOptions = {
  origin: process.env.FRONTEND || "http://localhost:8081",
};

app.disable("x-powered-by");

app.use(cors(corsOptions));

app.use(morgan("combined"));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(postRoute);

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

// 404 Handler
app.use((req, res, next) => {
  res.status(404).send("Lost?");
});

module.exports = app;
