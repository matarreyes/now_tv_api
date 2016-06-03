/**
 * Created by Alejandro on 21/05/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tvProgramSchema = new Schema({
    name: {type: String, unique: true, required: true, dropDups: true},
    genre: {"genre": {type: String, required: true}},
    year: {type: Number},
    description: {type: String},
    image64: {type: String}
});
module.exports = mongoose.model('TvMovie', tvProgramSchema);