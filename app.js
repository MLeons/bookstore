const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const config = require('./config/database');
var cors = require('cors');
const fs = require('fs');

const app = express();
const port = 3000;

app.set('view engine', 'html');
app.engine('html', function (path, options, callbacks) {
	fs.readFile(path, 'utf-8', callback);
});

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Connect to Mongoose
mongoose.connect(config.database);
let db = mongoose.connection;

db.once('open', () => {
	console.log('Connected to Mongodb');
})

db.on('error', (err) => {
	console.log('DB Error: ' + err);
});

let books = require('./routes/books');
let genres = require('./routes/genres');
let users = require('./routes/users');

app.use('/api/books', books);
app.use('/api/genres', genres);
app.use('/api/users', users);

app.use('/*', function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	next();
});

app.listen(port, function () {
	console.log('App started on port ' + port);
})

module.exports = app;