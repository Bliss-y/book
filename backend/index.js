const express = require("express");
const cors = require("cors");
const env = require("dotenv");
const app = express();
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");

env.config();

connection = require("./model/connection").connect();

app.use(express.json());
app.use(
  //this mean we don't need to use body-parser anymore
  express.urlencoded({
    extended: true,
  })
);

app.use(
  session({
    name: "book",
    secret: "secret",
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 5, secure: false },
  })
);

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use("/admin", require("./routes/admin"));
app.use("/", require("./routes/routes"));
app.use("/", require("./routes/loggedIn"));
app.listen(4000, async () => {
  {
    var password = "";
    const user = require("./model/user").model;
    if ((await user.find({ admin: true })).length < 1) {
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash("adminpassword", salt);
      const users = new user({
        fname: "admin",
        lname: "test",
        email: "admintest@admin.com",
        username: "admin",
        password: password,
        admin: true,
      });

      try {
        const user = await users.save();
        await new require("./model/list")
          .List({
            name: "reading",
            user: user._id,
            deletable: false,
          })
          .save();
        const List = require("./controllers/models").list;
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
        console.log("user saving success!");
      } catch (err) {
        console.log("eror adding: " + err + " password: " + password);
      }
    }
  }
  console.log("http://localhost:4000");
});
