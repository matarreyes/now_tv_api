var TvSerie = require('../models/tvSerie');
var express = require('express');
var router = express.Router();

/**
 * Get all and add 1, chained because use the same route
 */
router.route('/tvSeries')
    .get(function (req, res) {
        TvSerie.find(function (err, tvSerie) {
            if (err) {
                return res.send(err);
            }

            res.json(tvSerie);
        });
    })
    .post(function (req, res) {
        var tvSerie = new TvSerie(req.body);

        tvSerie.save(function (err) {
            if (err) {
                return res.send(err);
            }

            res.send({message: 'TvSerie Added'});
        });
    });

/**
 * update by id
 */
router.route('/tvSeries/:id').put(function(req,res){
    TvSerie.findOne({ _id: req.params.id }, function(err, tvSerie) {
        if (err) {
            return res.send(err);
        }

        for (prop in req.body) {
            tvSerie[prop] = req.body[prop];
        }

        // save the movie
        tvSerie.save(function(err) {
            if (err) {
                return res.send(err);
            }

            res.json({ message: 'Tv Serie updated!' });
        });
    });
});

/**
 * Get by id
 * TODO: Check if can be another field, not id
 */
router.route('/tvSeries/:id').get(function(req, res) {
    console.log(req.query); //The query attr is used to recover the ?data=value&data2=value2
    TvSerie.findOne({ _id: req.params.id}, function(err, tvSerie) {
        if (err) {
            return res.send(err);
        }

        res.json(tvSerie);
    });
});

/**
 * Get by name
 * TODO: Know if i can remove the ''
 */
router.route('/tvSeriesByName').get(function(req, res) {
    console.log(req.query.name); //The query attr is used to recover the ?data=value&data2=value2
    TvSerie.findOne({name: req.query.name}, function(err, tvSerie) {
        if (err) {
            return res.send(err);
        }

        res.json(tvSerie);
    });
});

/**
 * Get by Genre
 */
router.route('/tvSeriesByGenre')
    .get(function (req, res) {
        TvSerie.find({genre: req.query.genre}, function (err, tvSerie) {
            if (err) {
                return res.send(err);
            }

            res.json(tvSerie);
        });
    });

/**
 * Get by query
 */
router.route('/tvSeriesSearch/search')
    .get(function (req, res) {
        var param = req.query.query.substr(1, req.query.query.length-2);
        TvSerie.find({$or:[{'name': {"$regex": param, "$options": "i" }}, {'genre': {"$regex": param, "$options": "i" }}, {'country': {"$regex": param, "$options": "i" }}, {'director': {"$regex": param, "$options": "i" }}, {'description': {"$regex": param, "$options": "i" }} ]}, function (err, tvSerie) {
            if (err) {
                return res.send(err);
            }
            res.json(tvSerie);
        });
    });

/**
 * Delete one
 */
router.route('/tvSeries/:id').delete(function(req, res) {
    TvSerie.remove({
        _id: req.params.id
    }, function(err, user) {
        if (err) {
            return res.send(err);
        }

        res.json({ message: 'tv serie deleted' });
    });
});

module.exports = router;