const Author = require('../models/author');
const Book = require('../models/book');
const { show } = require('./books');

module.exports = {
  index,
  show: getBookByAuthor
};

async function index(req, res) {
  const authors = await Author.find({});
  res.render('authors/index', { title: 'All Authors', authors });
}

async function getBookByAuthor(req, res) {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) {
      return res.status(404).send("Author not found");
    }
    const books = await Book.find({ author: author._id }).populate("author");
    res.render('authors/show', { title: 'Author Detail', books, author });
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
}