const express = require('express');
const router = express.Router();
const reviewsCtrl = require('../controllers/reviews');
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.post('/books/:id/reviews', ensureLoggedIn, reviewsCtrl.create); 
router.delete('/reviews/:id', ensureLoggedIn, reviewsCtrl.delete);
router.put('/reviews/:id', ensureLoggedIn, reviewsCtrl.update);


module.exports = router;