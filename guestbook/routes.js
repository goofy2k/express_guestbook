//these are the routes for the example on page 130
// you may need to combine thoes with the original routes for the guestbook example

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
	User.findAll().then(res.render("_index", {  }))
			.catch(error => res.status(400).send(error));
//	.sort({ createdAt: "descending" })
//	.exec(function(err, users) 
	
//	if (err) { return next(err); }
//.then(function() {
//    res.redirect('/');
});


router.get("/signup", function(req, res) {
res.render("signup");
});

router.post("/signup", function(req, res, next) {
//get username and  password from the post
var username = req.body.username;
var password = req.body.password;
console.log("username: "+username+"   password: "+password);

////chek if the  user already exists
	User.findOne({ where: {username: username }}, function(err, user) {
		if (err) { return next(err); }
		if (user) {
				req.flash("error", "User already exists");
				return res.redirect("/signup");
			}

////If user does not exist, create and save new user
			var newUser = new User	(
			{
			username: username,
			password: password
			}
						);
newUser.save(next);
Console.log("newUser.save(next) reached and done");

								}
		); 
//end FindOne

}, //end signup, first parameter
 		passport.authenticate("login", 
						{
							successRedirect: "/",
							failureRedirect: "/signup",
							failureFlash: true
						}
					) //end passport.autheticate
);

router.post("/login", passport.authenticate("login", {
successRedirect: "/",
failureRedirect: "/login",
failureFlash: true
}));

router.get("/users/:username", function(req, res, next) {
User.findOne({ username: req.params.username }, function(err, user) {
if (err) { return next(err); }
if (!user) { return next(404); }
res.render("profile", { user: user });
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
if (req.isAuthenticated()) {
next();
} else {
req.flash("info", "You must be logged in to see this page.");
res.redirect("/login");
}
}


router.get("/edit", ensureAuthenticated, function(req, res) {
res.render("edit");
});

router.post("/edit", ensureAuthenticated, function(req, res, next) {
req.user.displayName = req.body.displayname;
req.user.bio = req.body.bio;
req.user.save(function(err) {
if (err) {
next(err);
return;
}
req.flash("info", "Profile updated!");
res.redirect("/edit");
});
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


//rendering needs a  user with : name, username, bio

