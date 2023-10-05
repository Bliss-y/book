const session = require("express-session");

module.exports.loggedIn = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.send({ status: "failure", message: "forbidden access" });
  }
};

module.exports.adminOnly = (req, res, next) => {
  if (req.session.user.admin) {
    next();
  } else {
    res.send({ status: "failure", message: "forbidden access" });
  }
};

module.exports.noLoggedIns = (req, res, next) => {
  if (req.session.user) {
    return res.send({ status: "failure", message: "forbidden access" });
  } else {
    next();
  }
};
