const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");

router.get("/", dashboardController.showDashboard);

router.get("/users", dashboardController.showUsers);

router.post("/addneworder", dashboardController.addNewOrder);

router.post("/deleteorder", dashboardController.deleteorder);

router.post("/deleteuser", dashboardController.deleteuser);

router.post('/assignorder',dashboardController.assignOrder)

router.post('/orderStatus',dashboardController.setOrderStatus)

module.exports = router;
