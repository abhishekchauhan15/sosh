const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const port = process.env.PORT || 8000;

const authRouter = require("./routes/authRoutes.js");

require("./database/connection");

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(cookieParser());

app.get("/api", (req, res) => {
  res.json("Welcome!");
});

app.use("/api", authRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
