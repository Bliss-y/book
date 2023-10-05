const { default: mongoose, Schema } = require("mongoose");

const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const user = {
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    hidden: true,
    require: true,
  },
  status: {
    type: String,
  },
  admin: {
    type: Boolean,
    default: false,
  },
  forums: {
    type: [Schema.Types.ObjectId],
    ref: "forum",
  },
};

module.exports.model = mongoose.model("user", new mongoose.Schema(user));

module.exports.save = async (body) => {
  try {
    const salt = await bcrypt.genSalt(10);
    if (!body.match(PASSWORD_REGEX)) {
      throw "Password must contain 8 characters, one letter and one number";
    }
    const password = await bcrypt.hash(body.password, salt);
    const users = new user({
      fname: body.fname,
      lname: body.lname,
      email: body.email,
      username: body.username,
      password: password,
      admin: true,
    });
    const user = await users.save();
    return user;
  } catch (err) {
    console.log("eror adding: " + err);
    return { error: err };
  }
};
