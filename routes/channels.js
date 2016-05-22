var Channel = require('../models/channel');
var express = require('express');
var router = express.Router();

/**
 * Get all and add 1, chained because use the same route
 */
router.route('/channels')
    .get(function (req, res) {
        Channel.find(function (err, channel) {
            if (err) {
                return res.send(err);
            }

            res.json(channel);
        });
    })
    .post(function (req, res) {
        var channel = new Channel(req.body);

        channel.save(function (err) {
            if (err) {
                return res.send(err);
            }

            res.send({message: 'Channel Added'});
        });
    });

/**
 * update by id
 */
router.route('/channels/:id').put(function(req,res){
    Channel.findOne({ _id: req.params.id }, function(err, channel) {
        if (err) {
            return res.send(err);
        }

        for (prop in req.body) {
            channel[prop] = req.body[prop];
        }

        // save the movie
        channel.save(function(err) {
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
router.route('/channels/:id').get(function(req, res) {
    Channel.findOne({ _id: req.params.id}, function(err, channel) {
        if (err) {
            return res.send(err);
        }

        res.json(channel);
    });
});

/**
 * Delete one
 */
router.route('/channels/:id').delete(function(req, res) {
    Channel.remove({
        _id: req.params.id
    }, function(err, channel) {
        if (err) {
            return res.send(err);
        }

        res.json({ message: 'Channel deleted' });
    });
});

module.exports = router;