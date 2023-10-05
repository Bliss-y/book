const session = require("express-session");
const model = require("../model/user");
const bcrypt = require("bcrypt");
const { List } = require("../model/list");

module.exports.register = async (req, res) => {
  const body = req.body;
  try {
    body.password = await bcrypt.hash(body.password, await bcrypt.genSalt(10));
    const user = await new model.model(body).save();
    const list = await new List({
      name: "reading",
      user: user._id,
      deletable: false,
    }).save();
    const list2 = await new List({
      name: "favorites",
      user: user._id,
      deletable: false,
    }).save();
    const list3 = await new List({
      name: "read later",
      user: user._id,
      deletable: false,
    }).save();
    if (!user.error) {
      res.json({ status: "success", username: body.username });
    } else {
      throw "Incorrect data format";
    }
  } catch (e) {
    res.json({ status: "error", error: e.message });
  }
};

// TODO: CREATE DELETE ACCOUNT
module.exports.edit = async (req, res) => {
  try {
    if (!session.user || session.user.username != req.body.username) {
      throw { message: "wrong username" };
    }
    const user = model.findOne({ username: req.body.username });
    user.lname = req.body.lname;
    if (req.body.password.length > 0) {
      user.password = await bcrypt.hash(
        req.body.password,
        await bcrypt.genSalt(10)
      );
    }
    user.fname = req.body.fname;
    user.email = req.body.email;
    await user.save();
    res.json({ status: "success" });
  } catch (e) {
    res.json({ status: "error", error: e.message });
  }
};

module.exports.login = async (req, res) => {
  const user = req.body;
  const realUser = await model.model.findOne({
    $or: [{ email: user.email }, { username: user.email }],
  });
  if (realUser && (await bcrypt.compare(user.password, realUser.password))) {
    req.session.user = {
      username: realUser.username,
      email: realUser.email,
      _id: realUser._id,
      fname: realUser.fname,
      lname: realUser.lname,
      admin: realUser.admin,
      forums: realUser.forums,
    };
    res.json({
      status: "success",
      user: {
        username: realUser.username,
        email: realUser.email,
        _id: realUser._id,
        fname: realUser.fname,
        lname: realUser.lname,
        admin: realUser.admin,
      },
    });
  } else {
    res.json({
      status: "error",
      error: "The username or password does not match",
    });
  }
};

module.exports.logout = async (req, res) => {
  if (req.session.user) {
    req.session.destroy((err) => {
      if (err) {
        res.json({ status: "error", messsage: "could not log out" });
        return;
      }
      res.json({ status: "success" });
    });
  }
};
