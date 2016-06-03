/**
 * Created by Alejandro on 21/05/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tvMovieSchema = new Schema({
    name: {type: String, unique: true, required: true, dropDups: true},
    genre: {"genre": {type: String, required: true}},
    year: {type: Number},
    country:{type:String},
    director: {type:String},
    cast: {type:String},
    description: {type: String},
    image64: {type: String}
});
module.exports = mongoose.model('TvMovie', tvMovieSchema);