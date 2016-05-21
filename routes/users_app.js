var User = require('../models/user');
var express = require('express');
var router = express.Router();

/**
 * Get all and add 1, chained because use the same route
 */
router.route('/users')
    .get(function (req, res) {
        User.find(function (err, users) {
            if (err) {
                return res.send(err);
            }

            res.json(users);
        });
    })
    .post(function (req, res) {
        var user = new User(req.body);

        user.save(function (err) {
            if (err) {
                return res.send(err);
            }

            res.send({message: 'User Added'});
        });
    });

/**
 * update by id
 */
router.route('/users/:id').put(function(req,res){
    User.findOne({ _id: req.params.id }, function(err, user) {
        if (err) {
            return res.send(err);
        }

        for (prop in req.body) {
            user[prop] = req.body[prop];
        }

        // save the movie
        user.save(function(err) {
            if (err) {
                return res.send(err);
            }

            res.json({ message: 'User updated!' });
        });
    });
});

/**
 * Get by id
 * TODO: Check if can be another field, not id
 */
router.route('/users/:id').get(function(req, res) {
    User.findOne({ _id: req.params.id}, function(err, user) {
        if (err) {
            return res.send(err);
        }

        res.json(user);
    });
});

/**
 * Delete one
 */
router.route('/users/:id').delete(function(req, res) {
    User.remove({
        _id: req.params.id
    }, function(err, user) {
        if (err) {
            return res.send(err);
        }

        res.json({ message: 'user deleted' });
    });
});

module.exports = router;