var Schedule = require('../models/schedule');
var express = require('express');
var router = express.Router();

//TODO: Filter by today, channel and searched content

/**
 * Get all and add 1, chained because use the same route
 */
router.route('/schedules')
    .get(function (req, res) {
        Schedule.find(function (err, schedule) {
            if (err) {
                return res.send(err);
            }

            res.json(schedule);
        });
    })
    .post(function (req, res) {
        var tvProgram = new Schedule(req.body);

        tvProgram.save(function (err) {
            if (err) {
                return res.send(err);
            }

            res.send({message: 'Schedule Added'});
        });
    });

module.exports = router;