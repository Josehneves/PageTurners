var express = require("express");
var router = express.Router();

const booksCtrl = require("../controllers/books");
const ensureLoggedIn = require("../config/ensureLoggedIn");

router.get("/", ensureLoggedIn,booksCtrl.index);
router.get("/new", ensureLoggedIn, booksCtrl.new);
router.get("/:id", ensureLoggedIn, booksCtrl.show);
router.post("/", ensureLoggedIn, booksCtrl.create);
router.delete("/:id", ensureLoggedIn, booksCtrl.delete);
router.put("/:id", ensureLoggedIn, booksCtrl.update);
router.get("/:id/edit", ensureLoggedIn, booksCtrl.edit);

module.exports = router;