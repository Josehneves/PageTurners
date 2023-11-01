const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
    default: 0
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userName: String,
  userAvatar: String
}, {
  timestamps: true
});

const bookSchema = new Schema({
  title: { type: String, required: true },
//   releaseYear: {
//     type: Number,
//     default: function() {
//       return new Date().getFullYear();
//     },
//     min: 1927
//   },
  Author: [{
    type: Schema.Types.ObjectId,
    ref: 'Author'
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Book', bookSchema);