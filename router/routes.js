const express = require("express");
const router = express.Router();

const {signup}= require("../controllers/signup");
const {signin}= require("../controllers/signin");
// const {logout}= require("../controllers/logout");


router.post("/signup", signup);
router.post("/signin", signin);
// router.post("/logout", logout);



module.exports = router;