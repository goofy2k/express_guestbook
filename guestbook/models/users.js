var mysql = require("mysql");
var bcrypt = require("bcrypt-nodejs");
var SALT_FACTOR = 10;
//define a table with users
// create table userSchema in database express
// create a database express and give express access to it 

//username : string  required:true, unique:true
//password : string required: true  (SECURE (hashed): LATER)
//createdAt : date
//displayname : string
//bio : string

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
//********END  OF EXAMPLE *********
