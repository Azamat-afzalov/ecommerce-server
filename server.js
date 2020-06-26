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

mongoose.connect(`${config.mongo_uri}`, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    return app.listen(PORT)
})
.then(() => {
    console.log(`listening on ${PORT} and connected to DB`)
})
.catch((err) => {
    console.log(err);
})