var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var genreSchema = new Schema({
    genre: { type : String , unique : true, required : true, dropDups: true }
});

module.exports = mongoose.model('Genre', genreSchema);