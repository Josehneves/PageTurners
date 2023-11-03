const Book = require("../models/book");
const Author = require("../models/author");

module.exports = {
  index,
  show,
  create,
  new: newBook,
  delete: deleteBook,
  update: updateBook,
  edit,
};

async function index(req, res) {
  const books = await Book.find({});
  res.render("books/index", { title: "All Books", books });
}

async function show(req, res) {
  const book = await Book.findById(req.params.id).populate("author");
  const author = await Author.find({ _id: { $nin: book.author } }).sort("name");
  res.render("books/show", { title: "Book Detail", book, author });
}

function newBook(req, res) {
  res.render("books/new", { title: "Add Book", errorMsg: "" });
}

async function create(req, res) {
  for (let key in req.body) {
    if (req.body[key] === "") delete req.body[key];
  }
  try {
    const book = await Book.create({
      ...req.body,
      title: req.body.title,
      user: req.user._id,
      finishedOn: req.body.finishedOn,
    });
    const author = await Author.findOne({ name: req.body.authorName });
    if (author) {
      req.body.author = author._id;
      book.author.push(author);
      await book.save();
      res.redirect(`/books/${book._id}`);
    } else {
      const newAuthor = await Author.create({
        ...req.body,
        name: req.body.authorName,
        born: req.body.born,
      });
      book.author.push(newAuthor);
      await book.save();
      res.redirect(`/books/${book._id}`);
    };
  } catch (err) {
    console.log(err);
    res.render("books/new", { errorMsg: err.message });
  }
}

async function deleteBook(req, res) {
  await Book.findByIdAndDelete(req.params.id);
  res.redirect(`/books`);
}

async function updateBook(req, res) {
  const book = await Book.findById(req.params.id);
  if (!book.user.equals(req.user._id)) return res.redirect("/books");
  await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.redirect("/books");
}

async function edit(req, res) {
  const book = await Book.findById(req.params.id);
  if (!book.user.equals(req.user._id)) return res.redirect("/books");
  const editDate = new Date();
  book.editDate = editDate ;
    await book.save();
  res.render("books/edit", { title: "Edit Book", book });
}
