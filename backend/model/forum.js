const { default: mongoose } = require("mongoose");

module.exports.Forum = new mongoose.model(
  "forum",
  new mongoose.Schema({
    username: {
      type: String,
      required: true,
    },
    userCount: {
      type: Number,
      default: 1,
    },
    private: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      required: true,
      default: "There is no description given but its probably cool Forum",
    },
    title: {
      type: String,
      required: true,
    },
  })
);
