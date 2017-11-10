const express = require('express');
const router = express.Router();

let Genre = require('../models/genre');
let Book = require('../models/book');

router.get('/', (req, res) => {
    Book.getBooks((err, books) => {
        if (err) {
            throw err;
        }
        res.json(books);
    });
});

router.get('/:_id', (req, res) => {
    Book.getBookById(req.params._id, (err, book) => {
        if (err) {
            throw err;
        }
        res.json(book);
    });
});

router.post('/', (req, res) => {
    var book = req.body;
    Book.addBook(book, (err, book) => {
        if (err) {
            throw err;
        }
        res.json(book);
    });
});

router.put('/:_id', (req, res) => {
    var id = req.params._id;
    var book = req.body;
    Book.updateBook(id, book, {}, (err, book) => {
        if (err) {
            throw err;
        }
        res.json(book);
    });
});

router.delete('/:_id', (req, res) => {
    var id = req.params._id;
    Book.removeBook(id, (err, book) => {
        if (err) {
            throw err;
        }
        res.json(book);
    });
});

module.exports = router;