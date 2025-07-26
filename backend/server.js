const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://rGouli:mongo%40DB9@cluster0.d2wzyuc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const app = express();
app.use(cors());
app.use(express.json());

mongoose
.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅MongoDB connected');
})
.catch((err) => {
  console.error('❌MongoDB connection error:', err);
});

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from backend' });
});

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
  }
});

io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);

  socket.on('join-order', (orderId) => {
    socket.join(orderId);
  });

  socket.on('update-location', ({ orderId, location }) => {
    io.to(orderId).emit('location-update', location);
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected');
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});

const Product = require('./models/Product');

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});
