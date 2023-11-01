const express = require("express");
const router = express.Router();
const authorsCtrl = require("../controllers/authors");
const ensureLoggedIn = require("../config/ensureLoggedIn");

// This router is mounted to a "starts with" path of '/'

// GET /performers/new (new functionality)
router.get("/authors/new", ensureLoggedIn, authorsCtrl.new);
// POST /performers (create functionality)
router.post("/authors", ensureLoggedIn, authorsCtrl.create);
// POST /movies/:id/performers (associate a performer with a movie)
router.post("/books/:id/authors", ensureLoggedIn, authorsCtrl.addToCast);

module.exports = router;