var Genre = require('../models/genre');
var express = require('express');
var router = express.Router();

/**
 * Get all and add 1, chained because use the same route
 */
router.route('/genres')
    .get(function (req, res) {
        Genre.find(function (err, genres) {
            if (err) {
                return res.send(err);
            }

            res.json(genres);
        });
    })
    .post(function (req, res) {
        var genre = new Genre(req.body);

        genre.save(function (err) {
            if (err) {
                return res.send(err);
            }

            res.send({message: 'Genre Added'});
        });
    });

/**
 * update by id
 */
router.route('/genres/:id').put(function(req,res){
    Genre.findOne({ _id: req.params.id }, function(err, genre) {
        if (err) {
            return res.send(err);
        }

        for (prop in req.body) {
            genre[prop] = req.body[prop];
        }

        // save the movie
        genre.save(function(err) {
            if (err) {
                return res.send(err);
            }

            res.json({ message: 'Genre updated!' });
        });
    });
});

/**
 * Get by id
 */
router.route('/genres/:id').get(function(req, res) {
    Genre.findOne({ _id: req.params.id}, function(err, genre) {
        if (err) {
            return res.send(err);
        }

        res.json(genre);
    });
});

/**
 * Delete one
 */
router.route('/genre/:id').delete(function(req, res) {
    Genre.remove({
        _id: req.params.id
    }, function(err, genre) {
        if (err) {
            return res.send(err);
        }

        res.json({ message: 'Genere deleted' });
    });
});

module.exports = router;