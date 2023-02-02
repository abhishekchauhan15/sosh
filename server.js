const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const  morgan= require("morgan");
const port = process.env.PORT || 8000;

require("./database/connection");


if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(cookieParser());
app.use(require("./router/routes.js"));

app.get("/api/v1", (req, res) => {
  res.json("Welcome!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});