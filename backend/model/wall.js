const { default: mongoose, Schema } = require("mongoose");

module.exports.Wall = new mongoose.model(
  "wall",
  new mongoose.Schema({
    user: {
      type: String,
      required: true,
    },
    post: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: new Date(),
      required: true,
    },
  })
);
