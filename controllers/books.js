const Book = require('../models/book');
const Author = require('../models/author');

module.exports = {
  index,
  show,
  new: newBook,
  create,
  delete: deleteBook
};

async function index(req, res) {
  const books = await Book.find({});
  res.render('books/index', { title: 'All Books', books });
}

async function show(req, res) {
  // Populate the cast array with performer docs instead of ObjectIds
  const book = await Book.findById(req.params.id).populate('author');
  // Mongoose query builder approach to retrieve performers not the movie:
    // Performer.find({}).where('_id').nin(movie.cast)
  // The native MongoDB approach uses a query object to find 
  // performer docs whose _ids are not in the movie.cast array like this:
  const author = await Author.find({ _id: { $nin: book.author } }).sort('name');
  res.render('books/show', { title: 'Book Detail', book, author });
}

function newBook(req, res) {
  // We'll want to be able to render an  
  // errorMsg if the create action fails
  res.render('books/new', { title: 'Add Book', errorMsg: '' });
}

async function create(req, res) {
  // convert nowShowing's checkbox of nothing or "on" to boolean
//   req.body.nowShowing = !!req.body.nowShowing;
  // Remove empty properties so that defaults will be applied
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }
  try {
    // Update this line because now we need the _id of the new movie
    const book = await Book.create({...req.body, title: req.body.title, finishedOn: req.body.finishedOn})
    const author = await Author.create({...req.body, name: req.body.authorName, born: req.body.born})

    book.author.push(author)
    book.save()
    // Redirect to the new movie's show functionality 
    res.redirect(`/books/${book._id}`);
  } catch (err) {
    // Typically some sort of validation error
    console.log(err);
    res.render('books/new', { errorMsg: err.message });
  }
}

async function deleteBook(req, res) {
  await Book.findByIdAndDelete(req.params.id);
  res.redirect('/books');
}