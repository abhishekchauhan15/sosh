const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");


exports.authenticate = async (req, res, next) => {
  console.log("hello from authenticate");

  try {
    //taking the token
    console.log("trying");
    let accessToken = req.headers["authorization"];
    console.log(accessToken);
    accessToken = accessToken.split(" ")[1];
    //verifying the token

    jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        console.log(err);
        res.status(401).json({ error: "Invalid token" });
      } else {
        console.log("user from token: ", user);
        req.user = user;
        next();
      }
    });
  } catch (error) {
    console.log(error);
  }
};
