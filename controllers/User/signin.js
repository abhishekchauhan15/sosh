const User = require("../../model/userSchema");
const jwtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const authenticate = require("../../middleware/authenticate");

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "Please fill all the fields" });
  }
  try {
    const user = await User.findOne({ email: email });
    if (user.isVerifed === false) {
      return res.status(422).json({ error: "user not verified" });
    }
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const token = await user.generateAuthToken();
        res.cookie("jwtoken", token, {
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true,
        });
        res.json({ message: "User signed in successfully" });
      } else {
        res.json({ error: "Invalid credentials" });
      }
    } else {
      res.json({ error: "Invalid credentials" });
    }
  } catch (err) {
    console.log(err);
  }
};
