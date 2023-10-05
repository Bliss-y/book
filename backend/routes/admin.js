const route = require("express").Router();
const add = require("../controllers/add");
route.post("/genre/add", add.addGenre);
route.post("/genre/edit", add.editGenre);
route.get("/book/delete/:id", add.deleteBook);
route.get("/genre/delete/:id", add.deleteGenre);
module.exports = route;
