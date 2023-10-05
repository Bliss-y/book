const Genre = require("../model/genre");
const Book = require("../model/book");
const List = require("../model/list");
const models = require("./models");
const session = require("express-session");
const { model } = require("mongoose");
module.exports.addGenre = async (req, res) => {
  const genre = req.body;
  try {
    new Genre(genre).save();
    return res.send({ status: "success" });
  } catch (e) {
    return res.send({ status: "failure", message: e.message });
  }
};

module.exports.addBook = async (req, res) => {
  const book = req.body;
  try {
    await new Book(book).save();
    const resp = await Genre.updateMany(
      { name: book.genres },
      { $inc: { registered_books: 1 } }
    );
    console.log(resp.nModified, resp.n);
    return res.send({ status: "success" });
  } catch (e) {
    return res.send({ status: "error", message: e.message });
  }
};

module.exports.addBookList = async (req, res) => {
  console.log(req.body);
  try {
    const list = await List.List.findById(req.body.list);
    if (list.user != req.session.user._id) {
      throw { message: " Access Denied for the user" };
    }
    if (!list.books.includes(req.body.list)) {
      list.books.push(req.body.book);
      await list.save();
    } else {
      throw { message: "book already exists" };
    }
    return res.json({ status: "success" });
  } catch (e) {
    console.log(e);
    return res.send({ status: "error", message: "Server error" });
  }
};

module.exports.removeBookList = async (req, res) => {
  console.log(req.body);
  try {
    const list = await List.List.findById(req.body.list);
    if (list.user != req.session.user._id) {
      throw { message: " Access Denied for the user" };
    }
    if (list.books.includes(req.body.book)) {
      list.books.splice(list.books.indexOf(req.body.book), 1);
      await list.save();
    } else {
      throw { message: "book doesnot exists" };
    }
    return res.json({ status: "success" });
  } catch (e) {
    console.log(e);
    return res.send({ status: "error", message: "Server error" });
  }
};

exports.addList = async (req, res) => {
  try {
    const user = req.session.user;
    const list = new List.List({
      name: req.body.name,
      user: user._id,
    }).save();
    return res.send({ status: "success", data: list });
  } catch (e) {
    console.log(e);
    return res.send({ status: "error", message: "Server error" });
  }
};

module.exports.addComment = async (req, res) => {
  const Comment = models.comment;
  const Book = models.book;
  try {
    if (!req.session.user) {
      throw "user not logged in.";
    }
    const book = await Book.findById(req.params.id);
    if (!book) {
      throw "book doesnot exist";
    }
    const comment = await new Comment({
      post: req.body.post,
      user: req.session.user.username,
      book: req.params.id,
    }).save();
    book.comments = book.comments + 1;
    await book.save();
    return res.json({ status: "success", data: comment });
  } catch (e) {
    console.log(e);
    return res.json({ status: "error", message: e.message });
  }
};

module.exports.starComment = async (req, res) => {
  const Star = models.star;
  const Comment = models.comment;
  try {
    if (!req.session.user) {
      throw { message: "user no logged in" };
    }
    const [star, comment] = await Promise.all([
      Star.findOne({
        user: req.session.user._id,
        comment: req.params.id,
      }),
      Comment.findById(req.params.id),
    ]);
    if (star) {
      throw { message: "already starred" };
    }
    if (!comment) {
      throw { message: "comment doesnot exist" };
    }
    comment.stars += 1;
    const [newStar, upComment] = await Promise.all([
      new Star({ user: req.session.user, comment: comment._id }).save(),
      comment.save(),
    ]);
    return res.json({ status: "success" });
  } catch (e) {
    console.log(e);
    return res.json({ status: "error", message: e.message });
  }
};

module.exports.unstarComment = async (req, res) => {
  const Star = models.star;
  const Comment = models.comment;
  try {
    if (!req.session.user) {
      throw { message: "user no logged in" };
    }
    const [star, comment] = await Promise.all([
      Star.findOne({
        user: req.session.user._id,
        comment: req.params.id,
      }),
      Comment.findById(req.params.id),
    ]);
    if (!star) {
      throw { message: "not starred" };
    }
    if (!comment) {
      throw { message: "comment doesnot exist" };
    }
    comment.stars -= 1;
    const [newStar, upComment] = await Promise.all([
      Star.findByIdAndDelete(star._id),
      comment.save(),
    ]);
    return res.json({ status: "success" });
  } catch (e) {
    console.log(e);
    return res.json({ status: "error", message: e.message });
  }
};

module.exports.reviewBook = async (req, res) => {
  const Book = models.book;
  const Review = models.review;
  try {
    if (!req.session.user) throw { message: "user not logged in" };
    const [book, old_review] = await Promise.all([
      Book.findById(req.params.id),
      Review.find({ user: req.session.user._id, book: req.params.id }).lean(),
    ]);
    if (!book._id) {
      throw { message: "book does not exist" };
    }
    if (old_review._id) {
      throw { message: "review already exists by the user for this book" };
    }
    const review = await new Review({
      book: book._id,
      rating: req.body.rating,
      review: req.body.review,
      user: req.session.user._id,
    }).save();
    if (review) {
      book.rating =
        (book.rating * book.raters + req.body.rating) / (book.raters + 1);
      book.raters += 1;
      const n_book = await book.save();
      return res.json({ status: "success", data: { n_book, review } });
    } else throw { message: "server error try again." };
  } catch (e) {
    console.log(e);
    return res.json({ status: "error", message: e.message });
  }
};

module.exports.editReview = async (req, res) => {
  const Book = models.book;
  const Review = models.review;
  try {
    if (!req.session.user) throw { message: "user not logged in" };
    const old_review = await Review.findById(req.params.review);
    console.log(typeof old_review);
    if (!old_review) {
      throw {
        message: "review doesnot already exist by the user for this book",
      };
    }
    const book = await Book.findById(old_review.book);
    if (!book) {
      throw { message: "book does not exist" };
    }
    const r = old_review.rating;
    old_review.rating = req.body.rating;
    old_review.review = req.body.review;
    const review = await old_review.save();
    if (review) {
      console.log(review);
      book.rating =
        (book.rating * book.raters - r + review.rating) / book.raters;
      const n_book = await book.save();
      console.log(n_book);
      return res.json({ status: "success", data: { n_book, review } });
    } else throw { message: "server error try again." };
  } catch (e) {
    console.log(e);
    return res.json({ status: "error", message: e.message });
  }
};

module.exports.removeReview = async (req, res) => {
  const Book = models.book;
  const Review = models.review;
  try {
    if (!req.session.user) throw { message: "user not logged in" };
    const old_review = await Review.findById(req.params.review).lean();
    if (!old_review) {
      throw {
        message: "review doesnot already exist by the user for this book",
      };
    }
    const book = await Book.findById(old_review.book);
    if (!book) {
      throw { message: "book does not exist" };
    }
    const review = Review.findByIdAndDelete(req.params.id);
    book.rating =
      (book.rating * book.raters - old_review.rating) / (book.raters - 1);
    book.raters -= 1;
    const n_book = await book.save();
    return res.json({ status: "success", data: { n_book, review } });
  } catch (e) {
    console.log(e);
    return res.json({ status: "error", message: e.message });
  }
};

module.exports.editGenre = async (req, res) => {
  const Genre = models.genre;
  const Book = models.book;
  try {
    // if (!req.session.user || !req.session.user.admin) {
    //   throw { message: "User not authenticated" };
    // }
    const genre = await Genre.findById(req.body._id);
    if (!genre) {
      throw { message: "Genre not found" };
    }
    await Book.updateMany(
      { genres: genre.name },
      { $set: { "genres.$[elem]": req.body.name } },
      {
        arrayFilters: [
          {
            elem: {
              $eq: genre.name,
            },
          },
        ],
      }
    );
    genre.name = req.body.name;
    console.log(genre);
    await Genre.findByIdAndUpdate(req.body._id, {
      $set: { name: req.body.name },
    });
    return res.json({ status: "success", data: genre });
  } catch (e) {
    console.log(e);
    return res.json({ status: "error", message: e.message });
  }
};

module.exports.deleteBook = async (req, res) => {
  const Book = models.book;
  const List = models.list;
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      throw { message: "book not found" };
    }
    await List.updateMany({ books: book._id }, { $pull: { books: book._id } });
    const resp = await Genre.updateMany(
      { name: book.genres },
      { $inc: { registered_books: -1 } }
    );
    await Book.findByIdAndRemove(req.params.id);
    res.json({ status: "success" });
  } catch (e) {
    console.log(e);
    return res.json({ status: "error", message: e.message });
  }
};

module.exports.deleteGenre = async (req, res) => {
  const Genre = models.genre;
  const List = models.list;
  try {
    const genre = await Genre.findById(req.params.id);
    if (!genre) {
      throw { message: "genre not found" };
    }
    await Book.updateMany(
      { genres: genre.name },
      { $pull: { genres: genre.name } }
    );
    await Genre.findByIdAndRemove(req.params.id);
    res.json({ status: "success" });
  } catch (e) {
    console.log(e);
    return res.json({ status: "error", message: e.message });
  }
};

module.exports.joinForum = async (req, res) => {
  try {
    const Forum = models.forum;
    const User = models.user;
    const forum = await Forum.findById(req.params.id);
    const user = await User.findById(req.session.user._id);
    if (user.forums.includes(forum._id)) {
      throw { message: "Already joined!" };
    }
    user.forums.push(forum._id);
    await user.save();
    forum.userCount++;
    await forum.save();
    req.session.user.forums.push(forum._id);
    return res.json({ status: "success" });
  } catch (e) {
    console.log(e);
    return res.json({ status: "error", message: e.message });
  }
};

module.exports.addForum = async (req, res) => {
  try {
    const Forum = models.forum;
    const User = models.user;
    const user = await User.findById(req.session.user._id);
    const forum = await new Forum({
      username: req.session.user.username,
      title: req.body.title,
      private: req.body.private,
      description: req.body.description || null,
    }).save();
    user.forums.push(forum._id);
    return res.json({ status: "success" });
  } catch (e) {
    console.log(e);
    return res.json({ status: "error", message: e.message });
  }
};

module.exports.getUserForum = async (req, res) => {
  try {
    const Forum = models.forum;
    const User = models.user;
    const user = await User.findById(
      req.params.id,
      "_id, lname, fname, username, forums, list"
    ).populate("forum");
    return res.json({ status: "success", data: user });
  } catch (e) {
    console.log(e);
    return res.json({ status: "error", message: e.message });
  }
};

module.exports.editForum = async (req, res) => {
  try {
    const Forum = models.forum;
    const User = models.user;
    const user = user.findById(req.session.user._id);
    const forum = await Forum.findById(req.params.id);
    forum.title = req.body.title;
    forum.description = req.body.description;
    forum.private = req.body.private;
    return res.json({ status: "success" });
  } catch (e) {
    console.log(e);
    return res.json({ status: "error", message: e.message });
  }
};

module.exports.leaveForum = async (req, res) => {
  try {
    const Forum = models.forum;
    const User = models.user;
    const forum = await Forum.findById(req.params.id);
    const user = await User.findById(req.session.user._id);
    if (!user.forums.includes(forum._id)) {
      throw { message: "Has not joined" };
    }
    user.forums.splice(user.forums.indexOf(forum._id), 1);
    req.session.user.forums.splice(user.forums.indexOf(forum._id), 1);
    await user.save();
    forum.userCount--;
    await forum.save();
    return res.json({ status: "success" });
  } catch (e) {
    console.log(e);
    return res.json({ status: "error", message: e.message });
  }
};

module.exports.deleteForum = async (req, res) => {
  try {
    const Forum = models.forum;
    const User = models.user;
    const forum = await Forum.findById(req.params.id);
    if (forum.user != req.session.user._id) {
      throw { message: "Access denied" };
    }
    await User.updateMany(
      { forums: forum._id },
      { $pull: { forums: forum._id } }
    );
    return res.json({ status: "success" });
  } catch (e) {
    console.log(e);
    return res.json({ status: "error", message: e.message });
  }
};

module.exports.addWall = async (req, res) => {
  console.log("here");
  try {
    const Wall = models.wall;
    const wall = await new Wall({
      user: req.session.user._id,
      post: req.body.post,
    }).save();
    return res.json({ status: "success" });
  } catch (e) {
    console.log(e);
    return res.json({ status: "error", message: e.message });
  }
};

module.exports.editWall = async (req, res) => {
  try {
    if (!session.user) throw { message: "user not logged in" };
    const Wall = models.wall;
    const wall = await Wall.findByIdAndUpdate(req.params.id, {
      post: req.body.post,
    }).save();
    return res.json({ status: "success", data: wall });
  } catch (e) {
    console.log(e);
    return res.json({ status: "error", message: e.message });
  }
};

module.exports.deleteWall = async (req, res) => {
  try {
    const Wall = models.wall;
    const wall = await Wall.findByIdAndRemove(req.params.id);
    res.json({ status: "success" });
  } catch (e) {
    console.log(e);
    return res.json({ status: "error", message: e.message });
  }
};

module.exports.addPost = async (req, res) => {
  try {
    const Forum = models.forum;
    const User = models.user;
    const Post = models.post;
    const forum = await Forum.findById(req.params.id);
    if (!forum) {
      throw { message: "forum does not exist" };
    }
    const post = await new Post({
      forum: forum._id,
      user: req.session.user._id,
      post: req.body.post,
    }).save();

    res.json({ status: "success" });
  } catch (e) {
    console.log(e);
    return res.json({ status: "error", message: e.message });
  }
};

module.exports.deletePost = async (req, res) => {
  try {
    const Wall = models.post;
    const wall = await Wall.findByIdAndRemove(req.params.id);
    res.json({ status: "success" });
  } catch (e) {
    console.log(e);
    return res.json({ status: "error", message: e.message });
  }
};
