const { default: mongoose, Schema } = require("mongoose");
module.exports.Author = new mongoose.model(
  "author",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  })
);
