/**
 * Created by Alejandro on 21/05/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username       : { type : String , unique : true, required : true, dropDups: true },
    name       : { type : String , required : true},
    surname       : { type : String, required : true},
    email       : { type : String , unique : true, required : true},
    password       : { type : String, required : true}
});

module.exports = mongoose.model('User', userSchema);