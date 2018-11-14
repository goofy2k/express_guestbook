var passport = require("passport");
var sequelize = require("sequelize");
var sequelize = new sequelize('nodered_db', 'nodered', 'Nwwnlil12', {host : '127.0.0.1', dialect : 'mysql', pool : {max : 5, min : 0, idle : 10000}});
var User = sequelize['import']("models/user_mysql.js");


//var User = require("./models/user_mysql"); 

//module.exports = function() {

	passport.serializeUser	(function(user, done) 	{
		console.log("passport.serializeUser: "+user.id+"   "+user.id );
		done(null, user.id);
							}
				);


  	passport.deserializeUser	(function(id, done) 	{
		console.log("passport.deserializeUser");
		User.findById(id, function(err, user) 		{    //check if this is existing seqeulize method
               		console.log("passport.deserializeUser passed User.findById");
			done(err, user); 			}
					); 
								});


var LocalStrategy = require("passport-local").Strategy;

passport.use(new LocalStrategy(      //"login"  replaced by "local"
   function(username, password, done) {
       User.findOne({ where: {username: username } })
		.catch(err => { return done(err); } )
		.then(user => { console.log("setuppassport.User.findOne first line in .then(user");
                		if (!user)	{ console.log("setuppassport.User.findOne: Invalid  USERNAME or password"); 
						  return done(null, false, { message: "No user has that username!" });
						}

				console.log("passport Local Strategy user Found in database");

				user.checkPassword      (password, function(err, isMatch) 	{
					if (err) { return done(err); }
					if (isMatch) {	console.log("setuppassport.User.findOne user.checkPassword: password is match");
							return done(null, user); //returns the current user.how to check if that is the case?????
						     }
					else
						     {	console.log("setuppassport.User.findOne: Invalid  username or PASSWORD");
							return done(null, false,{ message: "Invalid password." }); //does message work???
						     }
												}
							); //end of user.checkPassword
   }                 ); //end of findOne.then 


} //end of  LocalStrategy block
) //end of new LocalStrategy
); //end of passport.use
//                              }; //end of module.exports

