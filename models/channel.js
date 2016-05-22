/**
 * Created by Alejandro on 21/05/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//TODO: Maybe dropDups changes the id and this could be a problem in the future with relations.
var channelSchema = new Schema({
    name       : { type : String , unique : true, required : true, dropDups: true }
});

module.exports = mongoose.model('Channel', channelSchema);