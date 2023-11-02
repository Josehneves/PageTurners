const Author = require('../models/author');
const Book = require('../models/book');

module.exports = {
  index
};

async function index(req, res) {
  const authors = await Author.find({});
  res.render('authors/index', { title: 'All Authors', authors });
}