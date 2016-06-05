var express = require('express');
var unirest = require('unirest');
var router = express.Router();

//Distribution function
var doInsert = function (route, res) {
    unirest.post('http://api-now-tv.herokuapp.com/api/' + route)
        .send(res)
        .end(function (response) {
            console.log(response.body);
        });
};

/**
 * Get all and add 1, chained because use the same route
 */
router.route('/parsedInformation').post(function (req, res) {
    //TODO: Repartir respuesta; Tengo que saber si me envia un [] o n {} para hacer un foreach

    //Helps
    doInsert("genres", {genre: req.body.genre});
    doInsert("channels", {name: req.body.channel});

    //Content
    if(req.body.genre.indexOf("Serie") > -1){
        doInsert("tvSeries", {
            name: req.body.serieTitle,
            genre: {genre: req.body.genre},
            year: req.body.year,
            country:  req.body.country,
            director:  req.body.director,
            description:  req.body.description,
            image64: req.body.image64
        });

        doInsert("schedules", {
            title: req.body.title,
            genre: req.body.genre,
            channel: req.body.channel,
            date: req.body.date,
            hour: req.body.time,
            belongsTo: req.body.serieTitle
        });
    }else if (req.body.genre.indexOf("Cine -") > -1){
        console.log(req.body.genre);
        doInsert("tvMovies", {
            name: req.body.title,
            genre: req.body.genre,
            year: req.body.year,
            country:  req.body.country,
            director:  req.body.director,
            description:  req.body.description,
            image64: req.body.image64
        });

        doInsert("schedules", {
            title: req.body.title,
            genre: req.body.genre,
            channel: req.body.channel,
            date: req.body.date,
            hour: req.body.time,
            belongsTo: req.body.title
        });
    }else{
        doInsert("tvPrograms", {
            name: req.body.title,
            genre: {genre: req.body.genre},
            year: req.body.year,
            description:  req.body.description,
            image64: req.body.image64
        });

        doInsert("schedules", {
            title: req.body.title,
            genre: req.body.genre,
            channel: req.body.channel,
            date: req.body.date,
            hour: req.body.time,
            belongsTo: req.body.title
        });
    }
    
    res.send({message: 'working on it!'});
});

module.exports = router;