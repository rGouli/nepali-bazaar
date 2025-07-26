const mongoose = require('mongoose');
const Product = require('./models/Product');
const { ObjectId } = require('mongodb'); // Add this line at the top

const MONGO_URI = 'mongodb+srv://rGouli:mongo%40DB9@cluster0.d2wzyuc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGO_URI).then(async () => {
  await Product.deleteMany();

  await Product.insertMany([
    {
      _id: new ObjectId(), // Auto-generate unique _id
      name: 'Momo Masala',
      description: 'Authentic Nepali momo spice blend',
      price: 3.99,
      image: 'https://i.imgur.com/b1WZ5Jv.png',
    },
    {
      _id: new ObjectId(), // Auto-generate unique _id
      name: 'Basmati Rice (5kg)',
      description: 'Premium Nepali rice',
      price: 14.99,
      image: 'https://i.imgur.com/QUkOEZk.png',
    },
    {
      _id: new ObjectId(), // Auto-generate unique _id
      name: 'Gundruk',
      description: 'Fermented leafy vegetable',
      price: 5.5,
      image: 'https://i.imgur.com/62vMZoq.png',
    },
  ]);

  console.log('✅ Products inserted');
  process.exit();
});