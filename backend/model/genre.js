const { default: mongoose, Schema } = require("mongoose");
const Genre = mongoose.model(
  "genre",
  new Schema({
    name: {
      type: String,
      unique: true,
    },
    registered_books: {
      type: Number,
      default: 0,
    },
  })
);

module.exports = Genre;
