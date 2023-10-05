const { default: mongoose, Schema } = require("mongoose");
const user = require("./user");
module.exports.List = mongoose.model(
  "list",
  new Schema({
    user: { type: Schema.Types.ObjectId, ref: "user", required: true },
    name: { type: String, required: true },
    deletable: { type: Boolean, default: true },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    updatedAt: {
      type: Date,
      default: Date.now(),
    },
    books: { type: [Schema.Types.ObjectId], ref: "book", default: [] },
  })
);
