const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId, // Ensure _id is included
  name: String,
  description: String,
  price: Number,
  image: String,
});

module.exports = mongoose.model('Product', productSchema);