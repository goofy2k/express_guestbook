var mysql =  require("mysql");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var passport = require("passport");
var flash = require("connect-flash");
//puts all of your routes in another file
var routes = require("./routes");

var http = require("http");
var path = require("path");
var setUpPassport = require("./setuppassport");
var express = require("express");
//staticPath is the root for all static content
//browser, views etc should refer to / for content in the folder public
//and to /subfolder for content in the folder public/subfolder etc. etc. 
var staticPath = path.join(__dirname, "public");

var logger = require("morgan");
var bodyParser = require("body-parser");
var app = express();
app.use(express.static(staticPath));

//connects to your mysql server and express_test
// code here
//mongoose.connect("mongodb://localhost:27017/test");
setUpPassport();

//new code....
//app.set("port", process.env.PORT || 3000);


app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");
var entries = [];
app.locals.entries = entries;
app.use(logger("dev"));

//***** Uses four middlewares *****
app.use(bodyParser.urlencoded({ extended: false }));
//new code
app.use(cookieParser());
app.use(session({
secret: "TKRv0IJs=HYqrvagQ#&!F!%V]Ww/4KiVs$s,<<MX",
resave: true,
saveUninitialized: true
}));
app.use(flash());

//for logging in
app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

//*** Some routes from the guestbook example *****
//*** must be  moved to router.js ???? ******
//app.get("/guestbook", function(request, response) {
//response.render("index");
//});
//app.get("/new-entry", function(request, response) {
//response.render("new-entry");
//});
//app.post("/new-entry", function(request, response) {
//if (!request.body.title || !request.body.body) {
//response.status(400).send("Entries must have a title and a body.");
//return;
//}

//entries.push({
//title: request.body.title,
//content: request.body.body,
//published: new Date()
//});
//response.redirect("/guestbook");
//});
//app.use(function(request, response) {
//response.status(404).render("404");
//});
//*** END OF GUESTBOOK ROUTES ***

http.createServer(app).listen(3000, function() {
console.log("Guestbook app started on port 3000.");
//new code to replace the two  lines above???
//app.listen(app.get("port"), function() {
//console.log("Server started on port " + app.get("port"));

});
