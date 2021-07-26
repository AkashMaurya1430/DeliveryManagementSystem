const Order = require("../models/Order");
const User = require("../models/User");
const faker = require("faker"); 

module.exports.showDashboard = async (req, res) => {
  console.log('Session',req.session);
};

module.exports.showUsers = (req, res) => {
  console.log(req.session)
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

module.exports.assignOrder = (req,res)=>{
  console.log(req.body)
  User.findOne({ email: req.body.assignedTo }).then((response) => {
    console.log(response)
    Order.updateOne({_id:req.body.orderId},{assignedTo:response._id}).then((order)=>{
      res.status(200).send('Order Reassigned')
    })
    .catch(function (error) {
      console.log(error);
    });
  });  
}

module.exports.setOrderStatus = (req,res) =>{
  console.log(req.body)
  Order.updateOne({_id:req.body.orderId},{staus:req.body.status}).then((order)=>{
    res.status(200).send('Status Changed')
  })
  .catch(function (error) {
    console.log(error);
  });
}


async function seedDb(){
console.log('Faker',faker.commerce.productName())
for(i=0;i<1000;i++){
  const order = new Order({
    name: faker.commerce.productName(),
    assignedTo: '60f80c0c6b4d660d48d2d723',
  });

  order.save((err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log('SuccessFull')
    }
  });
}
}

// seedDb()