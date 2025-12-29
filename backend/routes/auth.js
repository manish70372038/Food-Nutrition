const express = require("express");
const router = express.Router();

// make sure folder name is "controllers"
const {
  login,
  signup,
  getUser
} = require("../controllers/authcontroller");
router.get('/getuser' , getUser)
router.post("/signup", signup);
router.post("/login", login);


module.exports = router;
