const { default: mongoose, Schema } = require("mongoose");

module.exports.Comment = new mongoose.model(
  "comment",
  new mongoose.Schema({
    user: {
      type: String,
      required: true,
    },
    book: {
      type: Schema.Types.ObjectId,
      ref: "book",
      required: true,
    },
    post: {
      type: String,
      required: true,
    },
    stars: {
      type: Number,
      required: true,
      default: 0,
    },
  })
);
