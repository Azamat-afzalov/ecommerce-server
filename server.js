const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config/server.js');
const api = require('./routes/api');


const app = express();
const PORT =  8080;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/api',api);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ success : false, message: message, data: data})
});

mongoose.connect(`${config.MONGO_URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify : false
}).then(() => {
    return app.listen(PORT)
})
.then(() => {
    console.log(`listening on ${PORT} and connected to DB`)
})
.catch((err) => {
    console.log(err);
})