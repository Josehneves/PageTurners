const express = require("express");
const router = express.Router();
const authorsCtrl = require("../controllers/authors");
const ensureLoggedIn = require("../config/ensureLoggedIn");

router.get("/",ensureLoggedIn, authorsCtrl.index);
router.get("/:id",ensureLoggedIn, authorsCtrl.show);
// router.get("../books/:id", ensureLoggedIn, authorsCtrl.show);


module.exports = router;