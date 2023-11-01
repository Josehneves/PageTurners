var express = require("express");
var router = express.Router();

const booksCtrl = require("../controllers/books");
const ensureLoggedIn = require("../config/ensureLoggedIn");

router.get("/", ensureLoggedIn,booksCtrl.index);
router.get("/new", ensureLoggedIn, booksCtrl.new);
router.get("/:id", ensureLoggedIn, booksCtrl.show);
router.post("/", ensureLoggedIn, booksCtrl.create);
router.delete("/books/:id", ensureLoggedIn, booksCtrl.delete);

module.exports = router;