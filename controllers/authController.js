const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("../models/User");
const Order = require("../models/Order");

module.exports.getLoginPage = (req, res) => {
  res.render("auth/login");
};

module.exports.login = async (req, res) => {
  await User.findOne({ email: req.body.email }, function (err, user) {
    if (!user) {
      res.status(201).send("User does not exist!");
    } else {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        if (user.userType === "Admin") {
          User.find({ userType: "Delivery Person" }, function (err, response) {
            // console.log("Response", response);
            Order.find({})
              .populate({
                path: "assignedTo",
              })
              .then((orders) => {
                res.render("Admin/dashboard", {
                  deliveryGuy: response,
                  orders: orders,
                });
              })
              .catch((err) => {
                console.log(err);
              });
          });
        } else if (user.userType === "Manager") {
          User.find({ userType: "Delivery Person" }, function (err, response) {
            // console.log("Response", response);
            Order.find({})
              .populate("assignedTo")
              .then((orders) => {
                res.render("Manager/dashboard", {
                  deliveryGuy: response,
                  orders: orders,
                });
              })
              .catch((err) => {
                console.log(err);
              });
          });
        } else {
          Order.find({ assignedTo: user._id })
            .populate("assignedTo")
            .then((orders) => {
              res.render("DeliveryPerson/dashboard", {
                orders: orders,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      } else {
        res.status(201).send("Incorrect Password");
      }
    }
  });
};

module.exports.getSignUpPage = (req, res) => {
  res.render("auth/signup");
};

module.exports.addUser = (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    let newUser = new User({
      email: req.body.email,
      password: hash,
      userType: req.body.userType,
    });

    newUser.save((err, result) => {
      if (err) {
        console.log(err);
        if (err.code === 11000) {
          res.send("User Already Exist's");
        } else {
          res.send(err);
        }
      } else {
        res.status(201).send("User Created Successfully");
      }
    });
  });
};
