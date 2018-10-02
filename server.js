// require("dotenv").config();
var express = require("express");
var bodyParser = require("body-parser");
var request = require("request");
var mongoose = require("mongoose");
var Note = require("./models/Note.js");
var Article = require("./models/Article.js");
var Save = require("./models/Save.js");
var logger = require("morgan");
var cheerio = require("cheerio");
var path = require("path");
var app = express();
var exphbs = require("express-handlebars");
var PORT = process.env.PORT || 8000;

// Parse application/x-www-form-urlencoded
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost/scrape_db");

var db = mongoose.connection;
db.on('error', function (err) {
    console.log('Mongoose Error', err);
});
db.once('open', function () {
    console.log("Mongoose connection is successful");
});

app.engine("handlebars",
    exphbs({
        defaultLayout: "main"
    }));

app.set("view engine", "handlebars");

require("./routes/html.js")(app);
require("./routes/scrape.js")(app);

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
module.exports = app;