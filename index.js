//const express = require('express');  // CommonJS syntax

/*
import express from 'express'; // ES6 module syntax
const app = express();
const port = 3000;


app.get('/', (req, res) => {
  console.log(req);
  res.send('Hello World!, this is my first Express server.');
});

app.get('/lists', (req, res) => {
  res.send('HTML, CSS, JS, React, Node.js, Express.js, PHP, MySQL');
});




app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
*/

/* index.js
   Purpose: Application entry point. Main responsibilities:
   1) Load environment variables
   2) Initialize Express app and middleware
   3) Mount API routes
   4) Synchronize database models with the DB (Sequelize `.sync()`)
   5) Start the server once DB sync succeeds

   Note: `.sync({ alter: true })` will update tables to match models — use with caution in production.
*/
import express from 'express';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js';
import sequelize from './config.js';
import Product from './models/product.js'; // ensure model is imported so Sequelize registers it

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware: parse JSON bodies
app.use(express.json());

// Mount product routes at /api/products
app.use('/api/products', productRoutes);

// Simple root endpoint helpful for quick checks
app.get('/', (req, res) => {
  res.send('Welcome to the Product API');
});

// Sync models with DB, then start server on success
sequelize.sync({ alter: true }).then(() => {
  console.log('Database synchronized');
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}).catch((error) => {
  console.error('Unable to synchronize the database:', error);
});