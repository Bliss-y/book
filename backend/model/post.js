const { default: mongoose, Schema } = require("mongoose");

module.exports.Post = new mongoose.model(
  "post",
  new mongoose.Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    post: {
      type: String,
      required: true,
    },
    forum: {
      type: Schema.Types.ObjectId,
      ref: "forum",
      required: true,
    },
    date: {
      type: Date,
      default: new Date(),
      required: true,
    },
    stars: {
      type: [Schema.Types.ObjectId],
      ref: "user",
      required: true,
      default: [],
    },
  })
);
