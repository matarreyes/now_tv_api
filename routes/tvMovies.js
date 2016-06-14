var TvMovie = require('../models/tvMovie');
var express = require('express');
var router = express.Router();

/**
 * Get all and add 1, chained because use the same route
 */
router.route('/tvMovies')
    .get(function (req, res) {
        TvMovie.find(function (err, tvMovie) {
            if (err) {
                return res.send(err);
            }

            res.json(tvMovie);
        });
    })
    .post(function (req, res) {
        var tvMovie = new TvMovie(req.body);

        tvMovie.save(function (err) {
            if (err) {
                return res.send(err);
            }

            res.send({message: 'TvMovie Added'});
        });
    });

/**
 * update by id
 */
router.route('/tvMovies/:id').put(function(req,res){
    TvMovie.findOne({ _id: req.params.id }, function(err, tvMovie) {
        if (err) {
            return res.send(err);
        }

        for (prop in req.body) {
            tvMovie[prop] = req.body[prop];
        }

        // save the movie
        tvMovie.save(function(err) {
            if (err) {
                return res.send(err);
            }

            res.json({ message: 'Tv movie updated!' });
        });
    });
});

/**
 * Get by id
 * TODO: Check if can be another field, not id
 */
router.route('/tvMovies/:id').get(function(req, res) {
    TvMovie.findOne({ _id: req.params.id}, function(err, tvMovie) {
        if (err) {
            return res.send(err);
        }

        res.json(tvMovie);
    });
});

/**
 * Get by name
 * TODO: Know if i can remove the ''
 */
router.route('/tvMovieByName').get(function(req, res) {
    console.log(req.query.name); //The query attr is used to recover the ?data=value&data2=value2
    TvMovie.findOne({name: req.query.name}, function(err, tvMovie) {
        if (err) {
            return res.send(err);
        }

        res.json(tvMovie);
    });
});

/**
 * Get by Genre
 */
router.route('/tvMoviesByGenre')
    .get(function (req, res) {
        TvMovie.find({genre: req.query.genre}, function (err, tvMovies) {
            if (err) {
                return res.send(err);
            }

            res.json(tvMovies);
        });
    });

/**
 * Delete one
 */
router.route('/tvMovies/:id').delete(function(req, res) {
    TvMovie.remove({
        _id: req.params.id
    }, function(err, user) {
        if (err) {
            return res.send(err);
        }

        res.json({ message: 'tv movie deleted' });
    });
});

module.exports = router;