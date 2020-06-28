const express = require('express');
const authRoutes = require('./auth');
const categoryRoutes = require('./category');
const productRoutes = require('./product');
const app = express();

app.use('/category',categoryRoutes);
app.use('/product', productRoutes);
app.use('/auth',authRoutes);


module.exports = app;