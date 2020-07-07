var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userinfoSchema = Schema({
	fname: 
	{
		type:String,
	},
	lname: 
	{
		type:String,
	},
	username: 
	{
		type:String,
	},
	status: 
	{
		type:String,
	},
	image:{
        type:String,
	},
	lastlogin:
	{
        type:String,
	},
	pwresetkey:
	{
        type:String,
	},
	pwresetexpirey:
	{
        type:String,
	},
	email: 
	{
		type:String,
	},
	emailntify: 
	{
		type:String,
	},
	online: 
	{
		type:String,
	},
	menu_open: 
	{
		type:String,
	},
	remember_token: 
	{
		type:String,
	},
	created_at: 
	{
		type:String,
	},
	updated_at: 
	{
		type:String,
    },
    password:
	{
		type:String,
	},
	role: {
		type: String,
		default: 'basic',
		enum: ["basic", "supervisor", "admin"]
	   },
	   accessToken: {
		type: String
	   }

});

module.exports = mongoose.model('userinfo', userinfoSchema);