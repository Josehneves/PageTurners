const Author = require('../models/author');
const Book = require('../models/book');

module.exports = {
  new: newAuthor,
  create,
  addToAuthor
};

async function addToAuthor(req, res) {
  const book = await Book.findById(req.params.id);
  // The cast array holds the performer's ObjectId (referencing)
  book.cast.push(req.body.authorId);
  await book.save();
  res.redirect(`/books/${book._id}`);
}

async function newAuthor(req, res) {
  //Sort performers by their name
  const authors = await Author.find({}).sort('name');
  res.render('authors/new', { title: 'Add Author', authors });
}

async function create(req, res) {
  // Need to "fix" date formatting to prevent day off by 1
  // This is due to the <input type="date"> returning the date
  // string in this format:  "YYYY-MM-DD"
  // https://stackoverflow.com/questions/7556591/is-the-javascript-date-object-always-one-day-off
  // Fix by either reformatting to "MM-DD-YYYY" or by 
  // appending a "time" fragment like this... 
  req.body.born += 'T00:00';
  try {
    await Author.create(req.body);
  } catch (err) {
    console.log(err);
  }
  res.redirect('/authors/new');
}