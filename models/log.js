// Importing Required NodeJs Modules
var mongoose = require('mongoose');

// Defining Log schema
var Log = new mongoose.Schema({}, { strict: false });

// Compile model from schema
module.exports = mongoose.model('Log', Log );