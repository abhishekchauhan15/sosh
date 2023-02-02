const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const  jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerifed: {
    type: Boolean,
    default: false,
  },
  resetLink: {
    data: String,
    default: "",
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      }
    }
  ],
});

//hasing the password

//this keyword is never used with arrow function coz is works opposite of the arrow function

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

//generating token
//userSchema is a instance of mongoose.Schema and when we work with instance we use methods

userSchema.methods.generateAuthToken = async function () {
  try {
    //dbId , userId
    // let tokenMern = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
    let tokenMern= jwt.sign(JSON.stringify(this._id ), process.env.JWT_SECRET);
    this.tokens = this.tokens.concat({ token: tokenMern });
    await this.save();
    return tokenMern;
  } catch (error) {
    console.log(error);
  }
};

//collection creation
const User = mongoose.model("registration", userSchema);

module.exports = User;