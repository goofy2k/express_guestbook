var http = require("http");
var path = require("path");
var express = require("express");
//staticPath is the root for all static content
//browser, views etc should refer to / for content in the folder public
//and to /subfolder for content in the folder public/subfolder etc. etc. 
var staticPath = path.join(__dirname, "public");

var logger = require("morgan");
var bodyParser = require("body-parser");
var app = express();
app.use(express.static(staticPath));

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");
var entries = [];
app.locals.entries = entries;
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.get("/", function(request, response) {
response.render("index");
});
app.get("/new-entry", function(request, response) {
response.render("new-entry");
});
app.post("/new-entry", function(request, response) {
if (!request.body.title || !request.body.body) {
response.status(400).send("Entries must have a title and a body.");
return;
}
entries.push({
title: request.body.title,
content: request.body.body,
published: new Date()
});
response.redirect("/");
});
app.use(function(request, response) {
response.status(404).render("404");
});
http.createServer(app).listen(3000, function() {
console.log("Guestbook app started on port 3000.");
});
