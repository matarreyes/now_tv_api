var Schedule = require('../models/schedule');
var express = require('express');
var moment = require('moment');
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

/**
 * Get by Today
 */
router.route('/schedules/today')
    .get(function (req, res) {
        Schedule.find({date: moment().format("YYYY-MM-DD")}, function (err, schedule) {
            if (err) {
                return res.send(err);
            }
            
            res.json(schedule.sort(function(a, b){
                console.log(moment(a.date + " " + a.hour).isBefore(b.date + " " + b.hour));
                if (moment(a.date + " " + a.hour).isBefore(b.date + " " + b.hour))
                    return -1;
                else if (moment(b.date + " " + b.hour).isBefore(a.date + " " + a.hour))
                    return 1;
                else
                    return 0;
            }));
        });
    });

/**
 * Get by Today search
 */
router.route('/schedules/today/search')
    .get(function (req, res) {
        var param = req.query.query.substr(1, req.query.query.length-2);
        Schedule.find({$or:[{'title': {"$regex": param, "$options": "i" }}, {'genre': {"$regex": param, "$options": "i" }}, {'channel': {"$regex": param, "$options": "i" }}, {'hour': {"$regex": param, "$options": "i" }}, {'belongsTo': {"$regex": param, "$options": "i" }}]}, function (err, schedule) {
            if (err) {
                return res.send(err);
            }
            res.json(schedule);
        });
    });

/**
 * Get by Today remember the encoded chars +, #, etc
 */
router.route('/schedules/todayByChannel')
    .get(function (req, res) {
        Schedule.find({date: moment().format("YYYY-MM-DD"), channel: req.query.channel.substr(1, req.query.channel.length-2)}, function (err, schedule) {
            if (err) {
                return res.send(err);
            }

            res.json(schedule.sort(function(a, b){
                console.log(moment(a.date + " " + a.hour).isBefore(b.date + " " + b.hour));
                if (moment(a.date + " " + a.hour).isBefore(b.date + " " + b.hour))
                    return -1;
                else if (moment(b.date + " " + b.hour).isBefore(a.date + " " + a.hour))
                    return 1;
                else
                    return 0;
            }));
        });
    });

module.exports = router;