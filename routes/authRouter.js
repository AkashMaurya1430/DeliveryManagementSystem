const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.get("/", function (req, res) {
  res.redirect("/login");
});

router.get("/login", authController.getLoginPage);

router.post("/login", authController.login);

router.get("/signup", authController.getSignUpPage);

router.post("/addUser", authController.addUser);

module.exports = router;
