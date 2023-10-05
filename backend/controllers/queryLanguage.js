const session = require("express-session");
const bcrypt = require("bcrypt");
const { List } = require("../model/list");

const models = require("./models");
/*
=============================================================
=============================================================
QUERY CLASS
=============================================================
*/

module.getById = async (req, res) => {
  if (!req.query.id) {
    return res.json({ status: "error", message: "Not proper query" });
  }
  let fields = [];
  if (req.query.fields) {
    fields = req.query.fields;
  } else {
    fields = null;
  }
  try {
    let data;
    if (!fields) {
      data = await require("../model/" + req.params.table)
        .find(req.query.id)
        .exec();
    } else {
      data = await require("../model/" + req.params.table)
        .findById(req.query.id, fields)
        .exec();
    }
    return res.json({ status: "success", data: data });
  } catch (e) {
    return res.json({ status: "error", message: e.message });
  }
};

module.add = async (req, res) => {
  const data = req.body;
  try {
    const model = require("../model/" + req.params.table);
    const d = new model(data);
    d.save();
    return res.json({ status: "success", data: data });
  } catch (e) {
    return res.json({ status: "error", message: e.message });
  }
};

module.exports.getLists = async (req, res) => {
  try {
    const lists = await List.find({ user: req.session.user._id }).populate(
      "books"
    );
    res.json({ status: "success", data: lists });
  } catch (e) {
    console.log(e);
    return res.json({ status: "error", message: e.message });
  }
};

module.exports.getBook = async (req, res) => {
  const Book = models.book;
  try {
    let book;
    if (req.params.id) {
      book = await Book.findById(req.params.id);
    } else {
      const fields = req.query.fields;
      const selectobj = req.query.genre
        ? { genres: { $in: req.query.genre.split(" ") } }
        : {};
      sortfield = {};
      if (req.query.sort) {
        sortfield[req.query.sort] = 1;
      }
      book = await Book.find(selectobj, fields)
        .sort(sortfield)
        .limit(req.query.limit ?? 10)
        .skip(req.query.page ?? 0);
    }
    res.json({ status: "success", data: book });
  } catch (e) {
    console.log(e);
    return res.json({ status: "error", message: e.message });
  }
};

module.exports.getReview = async (req, res) => {
  const Book = models.book;
  const Review = models.review;
  try {
    if (!req.session.user) throw { message: "user not logged in " };
    const book = await Book.findById(req.params.id);
    if (!book._id) {
      throw { message: "book not found" };
    }
    const review = await Review.findOne({
      user: req.session.user._id,
      book: book._id,
    });
    if (review?._id) {
      return res.json({ status: "success", data: review });
    } else {
      return res.json({ status: "success", data: { rating: 0 } });
    }
  } catch (e) {
    console.log(e);
    return res.json({ status: "error", message: e.message });
  }
};

module.exports.getComments = async (req, res) => {
  const Comment = models.comment;
  const Star = models.star;
  const page = req.params.page ?? 0;
  try {
    const comments = await Comment.find({ book: req.params.id })
      .lean()
      .limit(10)
      .skip(page);
    if (req.session.user) {
      const starred = await Star.find({
        user: req.session.user?._id,
        comment: comments.map((e) => {
          return e._id;
        }),
      });
      for (i = 0; i < starred.length; i++) {
        for (j = 0; j < comments.length; j++) {
          if (starred[i].comment.toString() == comments[j]._id.toString()) {
            comments[j].starred = true;
            break;
          }
        }
      }
    }
    return res.json({ status: "success", data: comments });
  } catch (e) {
    console.log(e);
    return res.json({ status: "error", message: e.message });
  }
};

module.exports.search = async (req, res) => {
  const Book = models.book;
  try {
    const query = req.query.q.split(" ");
    let rgstring = "(?:";
    // ^(?:combine|online|store| |,)+$
    for (let i of query) {
      if (i == "") {
        continue;
      }
      rgstring += i + "|";
    }
    rgstring += "-)+";

    const rg = new RegExp(rgstring);
    console.log(req.query);
    const selectobj =
      req.query.genre && req.query.genre != "" && req.query.genre?.length > 0
        ? {
            name: rg,
            genres: { $in: req.query.genre.split(" ") },
          }
        : { name: rg };

    const books = await Book.find(
      selectobj,
      "_id description name genres author"
    )
      .skip(req.query.page ? req.query.page : 0)
      .limit(10)
      .lean();
    console.log(books);
    return res.json({ status: "success", data: books });
  } catch (e) {
    console.log(e);
    return res.json({ status: "error", message: e.message });
  }
};

module.exports.qsearch = async (req, res) => {
  const Book = models.book;
  try {
    const query = req.query.q.split(" ");
    console.log(req.query);
    let rgstring = "(?:";
    // ^(?:combine|online|store|)+$
    for (let i of query) {
      if (i == "") {
        continue;
      }
      rgstring += i + "|";
    }
    rgstring += "-)+";
    const rg = new RegExp(rgstring);
    const books = await Book.find(
      {
        name: rg,
      },
      "_id name "
    )
      .sort("raters")
      .limit(10)
      .lean();
    return res.json({ status: "success", data: books });
  } catch (e) {
    console.log(e);
    return res.json({ status: "error", message: e.message });
  }
};

module.exports.getGenres = async (req, res) => {
  const Genre = models.genre;
  try {
    const genres = await Genre.find({});
    return res.json({ status: "success", data: genres });
  } catch (e) {
    console.log(e);
    return res.json({ status: "error", message: e.message });
  }
};

module.exports.getForums = async (req, res) => {
  const Forum = models.forum;
  try {
    const forums = await Forum.find({ private: false }).sort({ userCount: -1 });
    return res.json({ status: "success", data: forums });
  } catch (e) {
    console.log(e);
    return res.json({ status: "error", message: e.message });
  }
};

module.exports.getUserForums = async (req, res) => {
  const Forum = models.forum;
  const User = models.user;
  try {
    const user = await User.findById(req.session.user._id).populate("forums");
    res.json({ status: "success", data: user.forums });
  } catch (e) {
    console.log(e);
    return res.json({ status: "error", message: e.message });
  }
};

// Latest posts FYP for the user
module.exports.getUserForumPosts = async (req, res) => {
  const Forum = models.forum;
  const Post = models.post;
  const User = models.user;
  try {
    const user = await User.findById(req.sesson.user._id);
    const posts = await Post.find({ forum: { $in: user.forums } })
      .limit(10)
      .sort({ date: -1 })
      .populate("forum");
    return res.json({ status: "success", data: posts });
  } catch (e) {
    console.log(e);
    return res.json({ status: "error", message: e.message });
  }
};

module.exports.getForumPosts = async (req, res) => {
  const Forum = models.forum;
  const Post = models.post;
  const User = models.user;
  try {
    const forum = await Forum.findById(req.params.id).lean();
    if (!forum) {
      throw { message: "forum not exist" };
    }
    const posts = await Post.find({ forum: req.params.id })
      .skip(req.param.page ?? 0)
      .limit(10)
      .populate("user");
    return res.json({ status: "success", data: { posts, forum } });
  } catch (e) {
    console.log(e);
    return res.json({ status: "error", message: e.message });
  }
};

module.exports.getWallId = async (req, res) => {
  const Wall = models.wall;
  try {
    const posts = await Wall.findById(req.params.id);
    return res.json({ status: "success", data: posts });
  } catch (e) {
    console.log(e);
    return res.json({ status: "error", message: e.message });
  }
};

module.exports.getWall = async (req, res) => {
  const Wall = models.wall;
  const User = models.user;
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      throw { message: "User does not exist" };
    }
    const walls = await Wall.find({ user: req.params.id })
      .sort({ date: -1 })
      .skip(req.params.page ?? 0)
      .limit(10);
    res.json({ status: "success", data: { user, walls } });
  } catch (e) {
    console.log(e);
    return res.json({ status: "error", message: e.message });
  }
};
