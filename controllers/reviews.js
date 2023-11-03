const Book = require("../models/book");

module.exports = {
  create,
  delete: deleteReview,
  update: updateReview,
  // edit
};

async function create(req, res) {
  const book = await Book.findById(req.params.id);

  // Add the user-centric info to req.body (the new review)
  req.body.user = req.user._id;
  req.body.userName = req.user.name;
  req.body.userAvatar = req.user.avatar;

  // We can push (or unshift) subdocs into Mongoose arrays
  book.reviews.push(req.body);
  try {
    // Save any changes made to the movie doc
    await book.save();
  } catch (err) {
    console.log(err);
  }
  res.redirect(`/books/${book._id}`);
}

async function deleteReview(req, res) {
  const book = await Book.findOne({ "reviews._id": req.params.id, "reviews.user": req.user._id});
  if (!book) return res.redirect("/books");
  book.reviews.remove(req.params.id);
  await book.save();
  res.redirect(`/books/${book._id}`);
}

async function updateReview(req,res) {
  const book = await Book.findOne({ "reviews._id": req.params.id, "reviews.user": req.user._id});
  if (!book) return res.redirect("/books");
  const review = book.reviews.id(req.params.id);
  review.content = req.body.content;
  await book.save();
  res.redirect(`/books/${book._id}`);
}


// async function edit() {
//   const tip = await Review.findOne({
//     "reviews._id": req.params.id,
//     "reviews.user": req.user._id,
//   })
//   res.redirect(`reviews/${tip._id}`);
// }