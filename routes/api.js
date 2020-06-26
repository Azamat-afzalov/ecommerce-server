const express = require('express');
const authRoutes = require('./auth');
const app = express();

app.use('/auth', (req,res) => {
    res.send('hello world!')
});


module.exports = app;