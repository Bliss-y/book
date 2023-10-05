const { default: mongoose } = require("mongoose");
require("dotenv").config();

exports.connect = async (req, res) => {
  await mongoose.connect("mongodb://localhost:27017");
  return true;
};
