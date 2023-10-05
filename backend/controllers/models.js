module.exports = {
  book: require("../model/book"),
  author: require("../model/author").Author,
  comment: require("../model/comment").Comment,
  forum: require("../model/forum").Forum,
  genre: require("../model/genre"),
  list: require("../model/list").List,
  review: require("../model/review").Review,
  user: require("../model/user").model,
  star: require("../model/star").Star,
  forum: require("../model/forum").Forum,
  post: require("../model/post").Post,
  wall: require("../model/wall").Wall,
};
