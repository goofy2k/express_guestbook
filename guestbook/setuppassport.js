var passport = require("passport");
//This is the mongoose / mongodb model
//var User = require("./models/user");
//This is the  sequelize / mysql model

var sequelize = require("sequelize");


//var model = sequelize['import'](path.join(__dirname, file));
var sequelize = new sequelize('nodered_db', 'nodered', 'Nwwnlil12', {host : '127.0.0.1', dialect : 'mysql', pool : {max : 5, min : 0, idle : 10000}});

var User = sequelize['import']("models/user_mysql.js");


//var User = require("./models/user_mysql"); 

module.exports = function() {
passport.serializeUser(function(user, done) {
done(null, user._id);
});
passport.deserializeUser(function(id, done) {
User.findById(id, function(err, user) {
done(err, user);
});
});
};

var LocalStrategy = require("passport-local").Strategy;

passport.use("login", new LocalStrategy(
   function(username, password, done) {
//enter MYSQL specific code here
//not necessary as long as the user_mysql.js model is compatible with the mongo model (user.js)

       User.findOne({ where: {username: username } }, function(err, user) {
                if (err) { return done(err); }
                if (!user) 	{

				return done(null, false, { message: "No user has that username!" });

                        	}

	


	user.checkPassword(password, function(err, isMatch) {
		if (err) { return done(err); }
		if (isMatch) 	{
				return done(null, user);
				} 
			else 
				{
				return done(null, false,
			 	{ message: "Invalid password." });
				}

								}
	);
   }               );
}));


