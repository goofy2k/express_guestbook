//these are the routes for the example on page 130
//you may need to combine those with the original routes for the guestbook example

var express = require("express");
var sequelize = require("sequelize");

//This is the  sequelize / mysql model

//var User = require("./models/user_mysql");
//Should use sequelize.import User iso require??? 
var sequelize = new sequelize('nodered_db', 'nodered', 'Nwwnlil12', {host : '127.0.0.1', dialect : 'mysql', pool : {max : 5, min : 0, idle : 10000}});
//var model = sequelize['import'](path.join(__dirname, file));
var User = sequelize['import']("models/user_mysql.js");


var passport = require("passport");

var router = express.Router();

router.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	res.locals.errors = req.flash("error");
	res.locals.infos = req.flash("info");
	next();
	});



router.get("/", function(req, res, next) {
//Sync to create database, if it doesnt exist. You may move this to app.js
// User.tryout();
//	User.sync();
//	User.prototype.mypre();
//	User.findAll({where: {username: 'John'}, options: [{raw: true}] })
User.findAll()
//	.then(res.render("_index2", {users: users} ))
//sequelize uses a n alias user for users :-(

//   .then(user => {res.render("_index2", {user : user} )})
//   .then(user => {res.render("_index2", {user : users} )})
//   .then(user => {res.render("_index2", {users : user} )})   //OK !
//   .then(user => {res.render("_index2", {users : users} )})
//   .then(users => {res.render("_index2", {user : user} )})
//   .then(users => {res.render("_index2", {user : users} )})
//   .then(users => {res.render("_index2", {users : user} )})
//   .then(users => {res.render("_index2", {users : users} )}) //OK!

   .then(anyname => {res.render("_index2", {users : anyname} )}) //OK!!!


// Data format for transfer of  query result to html template (ejs)
//.then(queryresult => {res.render("_index2", {html_inputvar : queryresult} )})
//.then(queryresult => {res.render("_index2", {users : queryresult} )})




	.catch(err => {return next(err);});
//	.sort({ createdAt: "descending" })
//	.exec(function(err, users)
//	if (err) { return next(err); }
//.then(function() {
//    res.redirect('/');
});

router.get("/users1/:username", function(req, res){ res.render("debug"); });

router.get("/signup", function(req, res) {
res.render("signup");
});

router.get("/debug", function(req, res) {res.render("debug");
});

router.post("/signup", function(req, res, next) {
//get username and  password from the post
var username = req.body.username;
var password = req.body.password;
//console.log("username: "+username+"   password: "+password);

//follow up of signup (mongoose version)
////chek if the  user already exists
//	User.findOne({ where: {username: username }}, function(err, user) {
//		if (err) { return next(err); }
//		if (user) {
//				req.flash("error", "User already exists");
//				return res.redirect("/signup");
//			}

////If user does not exist, create and save new user
//			var newUser = new User	(
//			{
//			username: username,
//			password: password
//			}
//						);
//			newUser.save(next);
//			Console.log("newUser.save(next) reached and done");

//								}
//		); 
//end findOne (mongoose version)

//follow up of signup (sequelize version)
////chek if the  user already exists
      User.findOne({ where: {username: username }})

        .then(user =>   {
                        if (user)
                                {
                                req.flash("error", "User already exists")
                                return res.redirect("/signup");
                                }

////If user does not exist, create and save new user
                      var newUser = new User  (
                        {
                        username: username,
                        password: password
                        }
                                              );
                        console.log("newUser.save reached");
                        newUser.save(next);
                        console.log("newUser.save passed");
next(); //dummy next
                        }

)  //end .then



      	.catch(err => {return next(err);})


//end findOne (sequelize version)


}, //end signup, first middleware parameter

//second middleware for debugging purposes
//function (req,res,next) {
//console.log("debugging /login route BETWEEN newUSer.save and passport.authenticate");
//next();
//},

 		passport.authenticate("local", 
						{
							successRedirect: "/",
							failureRedirect: "/signup",
							failureFlash: true
						}
					) //end passport.authenticate
);

router.post("/login", passport.authenticate("local", {
successRedirect: "/",
failureRedirect: "/login",
failureFlash: true
}));


////NEED TO CAST findOne in seqelize .then().catch() scheme
//router.get("/users/:username", function(req, res, next) {
//User.findOne({ username: req.params.username }, function(err, user) {
//if (err) { return next(err); }
//if (!user) { return next(404); }
//res.render("profile", { user: user });
//});
//});
// the /users/:username route contains  a colon :  Is this because username is a variable part of the url?


router.get("/users/:username", function(req, res, next) {
//console.log("ROUTES /users/username: username: " + username);
User.findOne({where :{ username: req.params.username} })
.catch(err => {
//console.log("ROUTES /users/username: username: " + req.params.username);
return next(err); })
.then(user => { 
//console.log("ROUTES /users/username: username: " + req.params.username);

		if (!user) { 
	//		console.log("router.get('users... HITS (!user)");
			return next(); }
	//	console.log("router.get('users... HITS res.render)");
		res.render("profile", {user:user});
//res.render("debug");
		});
});



router.get("/login", function(req, res) {
res.render("login");
});

router.get("/logout", function(req, res) {
req.logout();
res.redirect("/");
});

function ensureAuthenticated(req, res, next) {
if (req.isAuthenticated()) {console.log("ensureAuthenticated.isAutenticated");
next();
} else { console.log("NOT ensureAuthenticated.isAutenticated");

req.flash("info", "You must be logged in to see this page.");
res.redirect("/login");
}
}


router.get("/edit", ensureAuthenticated, function(req, res) {
res.render("edit");
});

router.post("/edit", ensureAuthenticated, function(req, res, next) {
	console.log("router.post('/edit.....");
	req.user.displayName = req.body.displayname;
	req.user.bio = req.body.bio;
	req.user.save();

//(function(err) {
//			if (err) {
//			console.log("POST /edit ERR");
//			next(err);
//			return;
//		}
	console.log("POST /edit SUCCESS");
	req.flash("info", "Profile updated!");
	res.redirect("/"); //was "/edit"
//	});
});


//*** Some routes from the guestbook example *****
//*** must be  moved to router.js ???? ******

router.get("/guestbook", function(request, response) {
response.render("index");
});

router.get("/new-entry", function(request, response) {
response.render("new-entry");
});
router.post("/new-entry", function(request, response) {
if (!request.body.title || !request.body.body) {
response.status(400).send("Entries must have a title and a body.");
return;
}

entries.push({
                title: request.body.title,
                content: request.body.body,
                published: new Date()
        });
response.redirect("/guestbook");
});

router.use(function(request, response) {
response.status(404).render("404");
});
//*** END OF GUESTBOOK ROUTES ***

module.exports = router;

