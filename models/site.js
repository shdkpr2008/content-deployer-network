// Importing Required NodeJs Modules
var mongoose = require('mongoose');

// Defining Site schema
var siteSchema = new mongoose.Schema({
	user: String, //UserID who added the site's address
	name: String, //Name of the site to identify
	address: String, //Address of site eg. www.mysite.com or mysite.com 
	description: String, //Description of site
	peers: Number, //Number of peers connected serving the site
	bandwidth: Number //Shared Bandwidth served by the peers.  
});

// Compile model from schema
module.exports = mongoose.model('Site', siteSchema );