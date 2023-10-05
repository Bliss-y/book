const route = require("express").Router();
const ql = require("../controllers/queryLanguage");
route.get("/", (req, res) => {
  res.send("hello");
});

route.post("/auth/login", require("../controllers/authenticate").login);
route.post("/auth/register", require("../controllers/authenticate").register);

route.get("/auth/me", async (req, res) => {
  if (req.session.user) {
    res.json({ status: "success", data: req.session.user });
  } else {
    res.json({ status: "error", message: "no user logged in" });
  }
});
route.get("/test", (req, res) => {
  res.send({ p: req.query });
});

route.post("/user/edit", require("../controllers/Csession").loggedIn, () => {});

route.get("/book/get/:id", require("../controllers/queryLanguage").getBook);
route.get("/book/get/", require("../controllers/queryLanguage").getBook);
route.get(
  "/comments/:id/:page?",
  require("../controllers/queryLanguage").getComments
);

route.get("/top", () => {});
route.get("/browse/:page?", () => {});
route.get("/genre/:page?", () => {});
route.get("/search/:page?", ql.search);
route.get("/qsearch/", ql.qsearch);
route.get("/similar/:id", () => {});
route.get("/genres", ql.getGenres);
route.get("/getForumposts/:id/:page?", ql.getForumPosts);
route.get("/getForum/", ql.getForums);
route.get("/getUserForum/", ql.getUserForums);
route.get("/wall/user/:id/:page?", ql.getWall);
route.get("/wall/:id", ql.getWallId);
module.exports = route;
