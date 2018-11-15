
//*******     HERE STARTS THE ACTUAL CODE FOR MYSQL / SEQUELIZE  *****
// define a table with users
// create table userSchema in database express
// create a database express and give express access to it

//username : string  required:true, unique:true
//password : string required: true  (SECURE (hashed): LATER)
//createdAt : date
//displayname : string
//bio : string

//mysql most likely not needed here.
var mysql = require("mysql");
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

//  var  noop = function() {} ;   //dummy function as parameter for beforeSave.  bcrypt.genSalt (local, not exposed  by the model)

//Now extend the model with a beforeSave hook (method 3  http://docs.sequelizejs.com Hooks /  Declaring hooks
//Test
// Method 2 via the .hook() method (or its alias .addHook() method)
//User.hook('beforeValidate', (user, options) => {
//  user.mood = 'happy';
//});

//User.hook('beforeSave', (user, options) => {
//      console.log("User.hook('beforeSave' called");
//      console.log ("username: "+user.username + "   password: "+user.password);
//
//
//      return;

//});// end User.hook

// +++++Promise .then().catch() version of this hook+++++

//function progress() {};
//
//User.hook("beforeSave", function(user, done)   {

//        console.log("User.hook 'beforeSave' called");
//        console.log ("username: "+user.username + "   password: "+user.password);

//        if (!user.changed("password")) {return done(); }

//        console.log("beforeSave: user password did not change. Now going to generate SALT");

//        bcrypt.genSalt(SALT_FACTOR, function(err,SALT){return done() } );   //returns result and err  waar blijft err??? wat moet er bij noop?

//        console.log("beforeSave: user password did not change. Now going to generate HASH");
    //    bcrypt.hash(user.password, salt, progress, function(err, hashedPassword) ); //noop?
//        user.password = hashedPassword;
//        console.log("beforeSave: user password did not change. Saved hashedPassword");
//        console.log("user.password: " + user.password + "   hashedPassword: " + hashedPassword);
//                                                }
//);//end  User.hook Promise (next.catch version)


// +++++async await version.+++++

var progress = function progress() {};
var noop = function() {};


User.hook("beforeSave",  async function(user,done)  	{

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



	//hashedPassword = await bcrypt.hash(user.password, salt, progress) //noop?

//	var hashedPassword = async function() 	{
//		console.log(bcrypt.hash(user.passwordbcrypt,salt));
// 		await bcrypt.hash(user.passwordbcrypt,salt);
//		console.log(hashedPassword);
//						}
	//user.password = hashedPassword;
	console.log("beforeSave: user password did not change. Saved hashedPassword");
	console.log("user.password after hashing: " + user.password);
						}
)//end  User.hook (async await version)



//	+++++this user hook does not pass the hashedPassword +++++
//User.hook("beforeSave", (user, done) => {
//      console.log("User.hook('beforeSave' called");
//      console.log ("username: "+user.username + "   password: "+user.password);
//
//        if (!user.changed("password")) {return done(); }
//
//console.log("beforeSave: user password did not change. Now going to generate SALT");
//bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
//if (err) { return done(err); }
//
//console.log("beforeSave: user password did not change. Now going to generate HASH");
//bcrypt.hash(user.password, salt, noop, function(err, hashedPassword) {
//if (err) { return done(err); }
//user.password = hashedPassword;
//console.log("beforeSave: user password did not change. Saved hashedPassword");
//console.log("user.password: " + user.password + "   hashedPassword: " + hashedPassword);
//user.instance is not correctly tranferred to actual database save
//user.password is hashed here:  but result of save into database is non-hashed password.
//return;
//});
//});
//can you skip this return????
//      return;
//});// end User.hook


//); //end User.beforeSave


//OK
  User.prototype.checkPassword = function(guess, done ) 
	{
	console.log("checkPassword");
	console.log("guess: " + guess);
	console.log("this.password: "  + this.password);
	console.log("these are input for bcrypt.compare");
	bcrypt.compare(guess, this.password, function(err, isMatch) { done(err, isMatch) } );
	}; //end User.checkPassword


//OK
  User.prototype.name = function () {console.log("User.prototype.name");
  return this.displayName || this.username};  //this function is called in _index2.ejs  so  there ends at user.name()


//});
//)

//end module.exports

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
  return User;
};

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

