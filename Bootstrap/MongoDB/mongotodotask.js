var express = require("express");
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
var url = "mongodb://localhost:27017/MongoMVC";
const mongoose = require("mongoose");
mongoose.connect(url);
mongoose.pluralize(null);
const mvc = require("./mongomvc");
var dbase = mongoose.connection;
dbase.on("error", console.error.bind(console, "connection error:"));
app.post("/addlist", mvc.addlist);
app.post("/delete/:id", mvc.delete);
app.post("/update/:ide",mvc.update);
app.post("/deleteall",mvc.deleteall)
app.get("/:filterr?", mvc.output);

app.listen(8080);
