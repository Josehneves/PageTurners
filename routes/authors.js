const express = require("express");
const router = express.Router();
const authorsCtrl = require("../controllers/authors");
const ensureLoggedIn = require("../config/ensureLoggedIn");

router.get("/", ensureLoggedIn, authorsCtrl.index);

module.exports = router;