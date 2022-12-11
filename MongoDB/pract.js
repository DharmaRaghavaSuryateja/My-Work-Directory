var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var MongoClient = require("mongodb").MongoClient;
var mongodb = require("mongodb");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: "hh" }));
app.set("view engine", "ejs");
var url = "mongodb://localhost:27017/";
var array = [];
app.get("/", (req, res) => {
  MongoClient.connect(url, (err, db) => {
    let dbase = db.db("war");
    dbase
      .collection("war2")
      .insertOne({ name: "surya", age: 20 }, function (err, resultt) {
        console.log("inserted");
        dbase
          .collection("war2")
          .find({})
          .toArray(function (err, result) {
            console.log(result);
            array = result;
            console.log(array);
            res.send(array);
          });
      });
  });
});
app.listen(8080);
