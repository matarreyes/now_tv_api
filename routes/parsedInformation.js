var express = require('express');
var router = express.Router();

/**
 * Get all and add 1, chained because use the same route
 */
router.route('/parsedInformation').post(function (req, res) {
    console.log(req.body);
    //TODO: Repartir respuesta;
    res.send({message: 'todo'});
});

module.exports = router;