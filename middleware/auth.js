const User = require("../model/userSchema");

exports.auth = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json({ error: "Please fill all the fields" });
    }
    const user = await User.findOne({ email: email });
    if (user.isVerifed === false) {
      return res.status(422).json({ error: "verify yourself" });
    }
    next();
  } catch (error) {
    console.log(error);
  }
};