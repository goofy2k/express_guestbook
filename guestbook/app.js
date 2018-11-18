var express = require("express");
var app = express();
var debug = require('express-debug');

console.log("reading app configurations from conf/keys.json");
var configurations = require('./conf/keys.json');
var serverPort = configurations.server.port;
//console.log(configurations);

//var mysql =  require("mysql");
//NEED TO USE mysql2 for sequelize :-(     
const util = require("util");
var mysql2 = require ("mysql2");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var passport = require("passport");
var flash = require("connect-flash");
var sequelize = require("sequelize");
var morgan = require('morgan');
//to enable  creation of the db  before the server starts, use import iso require!!!!
//var User = require("./models/user_mysql");
//var model = sequelize['import'](path.join(__dirname, file));
//var User = sequelize['import'](".models/user_mysql.js");

//puts all of your routes in another file
var routes = require("./routes");

var http = require("http");
var path = require("path");
var setUpPassport = require("./setuppassport");
//staticPath is the root for all static content
//browser, views etc should refer to / for content in the folder public
//and to /subfolder for content in the folder public/subfolder etc. etc. 
var staticPath = path.join(__dirname, "public");
var logger = require("morgan");
var bodyParser = require("body-parser");
app.use(express.static(staticPath));
app.use(morgan('dev', {
  skip: function (req, res) { return res.statusCode < 400 }
}));



//connects to your mysql server and express_test
// code here
//connect "by hand" (works OK)
//var connection = mysql.createConnection({
//host : "127.0.0.1",
//user : "nodered",
//password : "",
//database : "nodered_db"
//});

//mongoose.connect("mongodb://localhost:27017/test");
//mariadb dialect not supported in this version of sequelize
//later , test if this  init of sequelize can  be  omitted it is also in user_mysql.js
var dbName = configurations.db.dbname;
var dbHost = configurations.db.host;
var dbPort = configurations.db.port;
var dbPass = configurations.db.password;
var dbUser = configurations.db.username;
//console.log(configurations);

var sequelize = new sequelize(dbName, dbUser, dbPass, {host : dbHost, dialect : 'mysql', pool : {max : 5, min : 0, idle : 10000}
});

//var model = sequelize['import'](path.join(__dirname, file));

var User = sequelize['import']("models/user_mysql.js");



// testing db access NOTE: probably only mysql.CreateConnection
//console.log('***   testing mysql database access   ***');
//connection.query('SELECT VERSION() AS version', function (error, results, fields) {
//  if (error) throw error;
//  {console.log('The solution is: ', results[0].version);
//   console.log('results = ',results);  
//}});

//connection.query('SELECT x AS "x", y as "y" FROM NLYobs', function (error, results, fields) {
//  if (error) throw error;
//  {console.log('The solution is: ', results[0].version);
//   console.log('results = ',results);
//}});

//console.log('*****************************************');


///????
//setUpPassport();

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
var appSecret = configurations.app.secret;
app.use(cookieParser());
app.use(session({
secret: appSecret,
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


//First sync to create database, if it doesnt exist.
User.sync();
debug(app, {});
http.createServer(app).listen(serverPort, function() {
console.log("Guestbook app started on port ",serverPort);
//console.log("user_app.js user: " + util.inspect(user, {showHidden: true, depth: 2}));
console.log("user_app.js User: " + util.inspect(User, {showHidden: true, depth: 2}));

//new code to replace the two  lines above???
//app.listen(app.get("port"), function() {
//console.log("Server started on port " + app.get("port"));

});
