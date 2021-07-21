const Order = require("../models/Order");
const User = require("../models/User");

module.exports.showDashboard = async (req, res) => {
  console.log(req.session);
};

module.exports.showUsers = (req, res) => {
  User.find({}).then((response) => {
    res.render("Admin/users", {
      users: response,
    });
  });
};

module.exports.addNewOrder = (req, res) => {
  User.findOne({ email: req.body.deliveryGuy }, function (err, result) {
    const order = new Order({
      name: req.body.name,
      assignedTo: result._id,
    });

    order.save((err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.status(201).send("Order Created Successfully");
      }
    });
  });
};

module.exports.deleteorder = (req, res) => {
  console.log(req.body);
  Order.findOneAndDelete({ _id: req.body.id }).then((response) => {
    res.send("Order Deleted Successfully");
  });
};

module.exports.deleteuser = (req, res) => {
  User.findOneAndDelete({ _id: req.body.id }).then((response) => {
    res.send("Order Deleted Successfully");
  });
};
