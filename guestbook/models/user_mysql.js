//USE following listing of  p128 of Express In Action as a template for your own code


//*******START  OF EXAMPLE *********
//var bcrypt = require("bcrypt-nodejs");
//var mongoose = require("mongoose");
//var SALT_FACTOR = 10;
//var userSchema = mongoose.Schema({
//username: { type: String, required: true, unique: true },
//password: { type: String, required: true },
//createdAt: { type: Date, default: Date.now },
//displayName: String,
//bio: String,
//});
//var noop = function() {};
//userSchema.pre("save", function(done) {
//var user = this;
//if (!user.isModified("password")) {
//return done();
//}
//bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
//if (err) { return done(err); }
//bcrypt.hash(user.password, salt, noop, function(err, hashedPassword) {
//if (err) { return done(err); }
//user.password = hashedPassword;

//done();
//});
//});
//});

//userSchema.methods.checkPassword = function(guess, done) {
//bcrypt.compare(guess, this.password, function(err, isMatch) {
//done(err, isMatch);
//});
//};
//userSchema.methods.name = function() {
//return this.displayName || this.username;
//};
//var User = mongoose.model("User", userSchema);
//module.exports = User;



//*******     HERE STARTS THE ACTUAL CODE FOR MYSQL / SEQUELIZE  *****
//define a table with users
// create table userSchema in database express
// create a database express and give express access to it

//username : string  required:true, unique:true
//password : string required: true  (SECURE (hashed): LATER)
//createdAt : date
//displayname : string
//bio : string

//mysql most likely not needed here.
//var mysql = require("mysql");
var sequelize = require("sequelize");
var bcrypt = require("bcrypt-nodejs");
var SALT_FACTOR = 10;
//do you have to define the auto increment unique id and  the PRIMARY KEY???
//or does sequelize perform that task?
//does sequelize create the table????

//var userSchema = sequelize.Schema({
//username: { type: String, required: true, unique: true },
//password: { type: String, required: true },
//createdAt: { type: Date, default: Date.now },
//displayName: String,
//bio: String,
//});

//test the connection (dev only)
//doe not work for me
//sequelize
//  .authenticate()
//  .then(() => {
//    console.log('Connection has been established successfully.');
//  })
//  .catch(err => {
//    console.error('Unable to connect to the database:', err);
//  });

//connect  again (connection in main app.js does not seem to work here
//mariadb dialect not supported in this version of sequelize
var sequelize = new sequelize('nodered_db', 'nodered', 'Nwwnlil12', {host : '127.0.0.1', dialect : 'mysql', pool : {max : 5, min : 0, idle : 10000}});


//my first sequelize model for testing the connection SUCCESS!!!!!!!!

//var User = sequelize.define('user', {
//  firstName: {
//    type: Sequelize.STRING//,
//////    field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
//  },
//  lastName: {
//    type: Sequelize.STRING
//  }
//}, {
//  freezeTableName: true // Model tableName will be the same as the model name
//});

//User.sync({force: true}).then(function () {
/////  // Table created
//  return User.create({
//    username: 'John',
//    lastName: 'Hancock'
//  });
//});

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define("user", 	
	{
        username: 	{ type: DataTypes.STRING(25), required: true, unique: true }
      , password: 	{ type: DataTypes.STRING(60), required: true }
//    , createdAt: 	{ type: Date, default: Date.now }   //is automaticall included by sequelize
      ,	displayName: 	{ type: DataTypes.STRING(25)}
      , bio: 		{ type: DataTypes.STRING(100)}
  	}
				) 
  User.sync({force: true}).then(function () {
/////  // Table created
       return User.create({
        username: 'Jeff',
        lastName: 'Hancock'
			  });

//  User.tryout() = function() { 
//  Console.log("User.tryout() in user_mysql.js"); };


});

return User;

};

//module.exports =f(sequelize, DataTypes)  {
//  var User = sequelize.define("user", {
//        username: { type: DataTypes.STRING, required: true, unique: true }
//,
//        password: { type: DataTypes.STRING, required: true },
//        createdAt: { type: Date, default: Date.now },
////      displayName: String,
////      bio: String
//        displayName: {type: DataTypes.STRING},
//        bio: {type: DataTypes.STRING}
//  };



//module.exports = (sequelize, DataTypes) => {
//  var User = sequelize.define('User', {
//    username: DataTypes.STRING
//  });

//  User.associate = function(models) {
//    models.User.hasMany(models.Task);
//  };
//  return User;
//};

//var User = sequelize.define("user" , {
//	username: { type: DataTypes.STRING, required: true, unique: true },
//	password: { type: DataTypes.STRING, required: true },
//	createdAt: { type: Date, default: Date.now },
////	displayName: String,
////	bio: String
////	displayName: {type: sequelize.STRING},
//	bio: {type: sequelize.STRING}
//});

//dummy function variable for use in bcrypt.hash
//var noop = function() {};

//adding a (instanceLevel????) method to user User.prototype.getFullname = function() {
//  return [this.username, this.password].join(' ');
//};

//this function in instance??? works (study for pre) User.prototype.mypre = function(){ console.log("this.username"); //done(); //done is not defined
//};

//where to put the parameters in the following definition of the User.pre function

//User.pre = function("save", function(done) { //	var user = this; //	if (!user.isModified("password")) { //	return done(); //	}

//	bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
//	if (err) { return done(err); }
//	bcrypt.hash(user.password, salt, noop, function(err, hashedPassword) {
//	if (err) { return done(err); }
//	user.password = hashedPassword;

//done();
//});
//});
//});


//userSchema.methods.checkPassword = function(guess, done) {
//bcrypt.compare(guess, this.password, function(err, isMatch) {
//done(err, isMatch);
//});
//};
//userSchema.methods.name = function() {
//return this.displayName || this.username;
//};
//var User = mongoose.model("User", userSchema);
// 
//module.exports = User;

