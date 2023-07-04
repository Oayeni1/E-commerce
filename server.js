const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
// const productRoutes = require('./routes/products');

const app = express();
app.use(express.json());

// Connect to MongoDB
const url='mongodb://127.0.0.1:27017/E-Commerce';
mongoose
  .connect(url, {
    useNewUrlParser: true
  })
  .then(async () => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Failed to connect to MongoDB', error));

// Register routes
app.use(authRoutes)
// await productRoutes;

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});