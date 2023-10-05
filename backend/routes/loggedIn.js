const route = require("express").Router();
const add = require("../controllers/add");
const authenticate = require("../controllers/authenticate");
const { getLists, getReview } = require("../controllers/queryLanguage");
const del = require("../controllers/delete");
route.get("/auth/logout", authenticate.logout);

route.post("/book/add", add.addBook);
route.post("/list/add_books", add.addBookList);
route.post("/list/new", add.addList);
route.post("/list/remove_books", add.removeBookList);
route.get("/list", getLists);
route.get("/list/delete/:list", del.deleteList);

route.get("/comment/star/:id", add.starComment);
route.get("/comment/unstar/:id", add.unstarComment);
route.post("/addComment/:id", add.addComment);
route.post("/addReview/:id/", add.reviewBook);
route.get("/review/:id", getReview);
route.post("/editReview/:review", add.editReview);
route.post("/deleteReview/:id", add.removeReview);
route.post("/addForum", add.addForum);
route.post("/editForum", add.editForum);
route.get("/deleteForum", add.deleteForum);

route.get("/joinforum/:id", add.joinForum);
route.get("/leaveForum/:id", add.leaveForum);
route.post("/addPost/:id", add.addPost);
route.post("/addwall", add.addWall);
route.get("/deleteWall/:id", add.deleteWall);
route.get("/deletePost/:id", add.deletePost);
module.exports = route;
