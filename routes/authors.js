const express = require("express");
const router = express.Router();
const authorsCtrl = require("../controllers/authors");
const ensureLoggedIn = require("../config/ensureLoggedIn");

// This router is mounted to a "starts with" path of '/'

// GET /author/new (new functionality)
router.get("/authors/new", ensureLoggedIn, authorsCtrl.new);
// POST /authors (create functionality)
router.post("/authors", ensureLoggedIn, authorsCtrl.create);
// POST /author/:id/author (associate a author with a book)
router.post("/books/:id/authors", ensureLoggedIn, authorsCtrl.addToBook);
// DELETE /books/:id/authors/:authroId (remove a author from a book)
router.delete("/books/:id/authors/:authorId", ensureLoggedIn, authorsCtrl.removeFromBook);

module.exports = router;