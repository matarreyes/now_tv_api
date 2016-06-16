var TvProgram = require('../models/tvProgram');
var express = require('express');
var router = express.Router();

/**
 * Get all and add 1, chained because use the same route
 */
router.route('/tvPrograms')
    .get(function (req, res) {
        TvProgram.find(function (err, tvProgram) {
            if (err) {
                return res.send(err);
            }

            res.json(tvProgram);
        });
    })
    .post(function (req, res) {
        var tvProgram = new TvProgram(req.body);

        tvProgram.save(function (err) {
            if (err) {
                return res.send(err);
            }

            res.send({message: 'TvProgram Added'});
        });
    });

/**
 * update by id
 */
router.route('/tvPrograms/:id').put(function(req,res){
    TvProgram.findOne({ _id: req.params.id }, function(err, tvProgram) {
        if (err) {
            return res.send(err);
        }

        for (prop in req.body) {
            tvProgram[prop] = req.body[prop];
        }

        // save the movie
        tvProgram.save(function(err) {
            if (err) {
                return res.send(err);
            }

            res.json({ message: 'Tv Program updated!' });
        });
    });
});

/**
 * Get by id
 * TODO: Check if can be another field, not id
 */
router.route('/tvPrograms/:id').get(function(req, res) {
    console.log(req.query); //The query attr is used to recover the ?data=value&data2=value2
    TvProgram.findOne({ _id: req.params.id}, function(err, tvProgram) {
        if (err) {
            return res.send(err);
        }

        res.json(tvProgram);
    });
});

/**
 * Get by name
 * TODO: Know if i can remove the ''
 */
router.route('/tvProgramsByName').get(function(req, res) {
    console.log(req.query.name); //The query attr is used to recover the ?data=value&data2=value2
    TvProgram.findOne({name: req.query.name}, function(err, tvProgram) {
        if (err) {
            return res.send(err);
        }

        res.json(tvProgram);
    });
});

/**
 * Get by Genre
 */
router.route('/tvProgramsByGenre')
    .get(function (req, res) {
        TvProgram.find({genre: req.query.genre}, function (err, tvProgram) {
            if (err) {
                return res.send(err);
            }

            res.json(tvProgram);
        });
    });

/**
 * Get by query
 */
router.route('/tvProgramsSearch/search')
    .get(function (req, res) {
        var param = req.query.query.substr(1, req.query.query.length-2);
        TvProgram.find({$or:[{'name': {"$regex": param, "$options": "i" }}, {'genre': {"$regex": param, "$options": "i" }}, {'description': {"$regex": param, "$options": "i" }}]}, function (err, tvProgram) {
            if (err) {
                return res.send(err);
            }
            res.json(tvProgram);
        });
    });


/**
 * Delete one
 */
router.route('/tvPrograms/:id').delete(function(req, res) {
    TvProgram.remove({
        _id: req.params.id
    }, function(err, user) {
        if (err) {
            return res.send(err);
        }

        res.json({ message: 'tv Program deleted' });
    });
});

module.exports = router;