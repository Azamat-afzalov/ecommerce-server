const express = require('express');
const authRoutes = require('./auth');
const categoryRoutes = require('./category');
const app = express();

app.use('/category',categoryRoutes);
app.use('/auth',authRoutes);


module.exports = app;