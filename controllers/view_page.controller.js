const Vehicle = require("../models/vehicle.model");

exports.home = (req, res) => {
  res.render("home", { text: "This is EJS", title: "Home Page" });
};
