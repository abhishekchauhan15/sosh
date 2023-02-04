const express = require("express");
const router = express.Router();

const {signup}= require("../controllers/user/signup");
const {signin}= require("../controllers/user/signin");



router.post("/signup", signup);
router.post("/signin", signin);



module.exports = router;