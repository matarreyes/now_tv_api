/**
 * Created by Alejandro on 21/05/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var scheduleSchema = new Schema({
    title: {type: String, required:true},
    genre: {type: String, required: true},
    channel: {type: String, required: true},
    date:{type: String, required: true},
    hour: {type: String, required: true},
    belongsTo: {type: String, required: true}
});
module.exports = mongoose.model('Schedule', scheduleSchema);