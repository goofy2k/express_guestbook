router.post("/signup", function(req, res, next) {
var username = req.body.username;
var password = req.body.password;
User.findOne({ username: username }, function(err, user) {
if (err) { return next(err); }
if (user) {
req.flash("error", "User already exists");
return res.redirect("/signup");
}
var newUser = new User({
username: username,
password: password
});
newUser.save(next);
});
}, passport.authenticate("login", {
successRedirect: "/",
failureRedirect: "/signup",
failureFlash: true
}));
