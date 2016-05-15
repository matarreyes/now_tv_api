var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var genreSchema = new Schema({
    genre: String
});

module.exports = mongoose.model('Genre', genreSchema);