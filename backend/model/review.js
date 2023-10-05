const { default: mongoose, Schema } = require("mongoose");
module.exports.Review = new mongoose.model(
  "review",
  new mongoose.Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    book: {
      type: Schema.Types.ObjectId,
      ref: "book",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    review: {
      type: String,
      default: "no review",
    },
  })
);
