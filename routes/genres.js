const express = require('express');
const router = express.Router();

let Genre = require('../models/genre');
let Book = require('../models/book');

router.get('/', (req, res) => {
    Genre.getGenres((err, genres) => {
        if (err) {
            throw err;
        }
        res.json(genres);
    });
});

router.post('/', (req, res) => {
    var genre = req.body;
    Genre.addGenre(genre, (err, genre) => {
        if (err) {
            throw err;
        }
        res.json(genre);
    });
});

router.put('/:_id', (req, res) => {
    var id = req.params._id;
    var genre = req.body;
    Genre.updateGenre(id, genre, {}, (err, genre) => {
        if (err) {
            throw err;
        }
        res.json(genre);
    });
});

router.delete('/:_id', (req, res) => {
    var id = req.params._id;
    Genre.removeGenre(id, (err, genre) => {
        if (err) {
            throw err;
        }
        res.json(genre);
    });
});

module.exports = router;
