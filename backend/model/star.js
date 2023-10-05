const { default: mongoose, Schema } = require("mongoose");

module.exports.Star = new mongoose.model(
  "star",
  new mongoose.Schema({
    user: {
      type: String,
      required: true,
    },
    comment: {
      type: Schema.Types.ObjectId,
      ref: "comment",
      required: true,
    },
  })
);
