const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");

router.get("/", dashboardController.showDashboard);

router.get("/users", dashboardController.showUsers);

router.post("/addneworder", dashboardController.addNewOrder);

router.post("/deleteorder", dashboardController.deleteorder);

router.post("/deleteuser", dashboardController.deleteuser);

module.exports = router;
