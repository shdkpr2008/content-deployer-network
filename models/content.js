// Importing Required NodeJs Modules
var mongoose = require('mongoose');

// Define Content schema
var contentSchema = new mongoose.Schema({
  url: String, //Url of the content
  size: Number , //Size of the content
  peerIds: [String], //Array of PeerIds available
  hashes: [String] //Sha1 hashes of the blocks of content
});

// Compile model from schema
module.exports = mongoose.model('content', contentSchema );