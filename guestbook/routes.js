//these are the routes for the example on page 130
// you may need to combine thoes with the original routes for the guestbook example

var express = require("express");
var User = require("./models/user");
var router = express.Router();
router.use(function(req, res, next) {
res.locals.currentUser = req.user;
res.locals.errors = req.flash("error");
res.locals.infos = req.flash("info");
next();
});
router.get("/", function(req, res, next) {
User.find()
.sort({ createdAt: "descending" })
.exec(function(err, users) {
if (err) { return next(err); }
res.render("_index", { users: users });
});
});
module.exports = router;
