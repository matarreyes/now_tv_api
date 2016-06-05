/**
 * Created by Alejandro on 21/05/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tvSerieSchema = new Schema({
    name: {type: String, unique: true, required: true, dropDups: true},
    genre: {type: String, required: true},
    country: {type: String},
    year: {type: Number},
    cast: {type:String},
    director: {type:String},
    description: {type: String},
    image64: {type: String}
});
module.exports = mongoose.model('TvSerie', tvSerieSchema);