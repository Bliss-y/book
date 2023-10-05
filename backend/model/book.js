const { default: mongoose, Schema } = require("mongoose");
const Book = mongoose.model(
  "book",
  new Schema({
    name: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "author",
    },
    isbn: { type: String, index: true },
    genres: {
      type: [String],
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    raters: {
      type: Number,
      default: 0,
    },
    readers: {
      type: Number,
      default: 0,
    },
    favorites: {
      type: Number,
      default: 0,
    },
    comments: {
      type: Number,
      default: 0,
      required: true,
    },
  })
);

module.exports = Book;
