/* ----------USER MODEL IN SEQUELIZE / MYSQL ---------- */

//mysql most likely not needed here.
var mysql = require("mysql");
// should you use mysql2 with sequelize?
var util = require("util");
var sequelize = require("sequelize");
var bcrypt = require("bcrypt-nodejs");

var SALT_FACTOR = 2; //10

//mariadb dialect not supported in this version of sequelize
var sequelize = new sequelize('nodered_db', 'nodered', 'Nwwnlil12', {host : '127.0.0.1', dialect : 'mysql', pool : {max : 5, min : 0, idle : 10000} } );

module.exports = (sequelize, DataTypes) => {

  var User = sequelize.define("user",
	{
        username: 	{ type: DataTypes.STRING(25), required: true, unique: true }
      , password: 	{ type: DataTypes.STRING(100), required: true }
//    , createdAt: 	{ type: Date, default: Date.now }   //is automaticall included by sequelize
      ,	displayName: 	{ type: DataTypes.STRING(25)}
      , bio: 		{ type: DataTypes.STRING(100)}
  	}
	)//end sequelize.define



// +++++async await version.+++++

var progress = function progress() {};
var noop = function() {};


User.addHook("beforeSave",  async function(user,done)  	{

      	console.log("User.hook('beforeSave' called");
      	console.log ("username: "+user.username + "   password: "+user.password);

	if (!user.changed("password")) {return done; }

	console.log("beforeSave: user password did not change. Now going to generate SALT");

	const salt = await bcrypt.genSalt(SALT_FACTOR,noop);   //returns result and err  waar blijft err??? wat moet er bij noop?
	console.log("beforeSave: user password did not change. Now going to generate HASH");

bcrypt.hash(user.password, salt, noop, function(err, hash) {
  if (err) {
     throw err;
  }
  // Do whatever you like with the hash
  hashedPassword = hash;
  user.password = hashedPassword;
console.log("user.password: " + user.password );
});

	console.log("beforeSave: user password did not change. Saved hashedPassword");
	console.log("user.password after hashing: " + user.password);
						}
)//end  User.hook (async await version)



  User.prototype.checkPassword = function(guess, done ) 
	{
	console.log("checkPassword");
	console.log("guess: " + guess);
	console.log("this.password: "  + this.password);
	console.log("these are input for bcrypt.compare");
	bcrypt.compare(guess, this.password, function(err, isMatch) { done(err, isMatch) } );
	}; //end User.checkPassword


 //this function is called in _index2.ejs  so  there ends at user.name()
  User.prototype.name = function () {  return this.displayName || this.username};  
 
  return User;
};



