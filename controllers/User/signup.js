const User = require("../../model/userSchema");

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(422).json({ error: "Please fill all the fields" });
  }
  if (
    !/^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9-]+).([a-z]{2,8})(.[a-z]{2,8})?$/.test(
      email
    )
  )
    return res.status(422).json({ error: "Invalid Email" });

  try {
    console.log("checking if user already exists");
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      console.log("user found in db");
      return res.status(422).json({ error: "User already exist" });
    } else {
      console.log("adding user to db");
      const user = new User({ name, email, password });
      console.log("saving the data to db");
      await user.save();
      console.log("data saved");
      res.json({ message: "User registered successfully" })
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};