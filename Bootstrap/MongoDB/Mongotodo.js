var express = require("express");
var bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
var mongodb = require("mongodb");
const { count } = require("console");
var url = "mongodb://localhost:27017/TodoMongoDB";
var app = express();
var array = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
//render css files
app.use(express.static("public"));

app.post("/addlist", function (req, res) {
  var list1 = { list: req.body.name, isCompleted: "false" };
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    let dbase = db.db("TodoMongoDB");
    dbase.collection("Todo").insertOne(list1, function (err, resultt) {
      if (err) throw err;

      dbase
        .collection("Todo")
        .find({})
        .toArray(function (err, result) {
          array = result;
          db.close();
          console.log(req.body.value);
          res.redirect("/");
        });
    });
  });
});
app.post("/update/:idr", function (req, res) {
  var idr = mongodb.ObjectId(req.params.idr);
  var completed = req.body.check;

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    let dbase = db.db("TodoMongoDB");
    console.log(completed);
    if (completed === "false") {
      dbase
        .collection("Todo")
        .updateOne(
          { _id: idr },
          { $set: { isCompleted: "true" } },
          function (err, result) {
            res.redirect("/");
          }
        );
    } else {
      dbase
        .collection("Todo")
        .updateOne(
          { _id: idr },
          { $set: { isCompleted: "false" } },
          function (err, result) {
            res.redirect("/");
          }
        );
    }
  });
});

app.post("/delete/:ide", function (req, res) {
  var idee = new mongodb.ObjectId(req.params.ide);
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    let dbase = db.db("TodoMongoDB");
    dbase.collection("Todo").deleteOne({ _id: idee }, function (err, obj) {
      if (err) throw err;
      console.log("deleted");

      res.redirect("/");
    });
  });
});

app.get("/", function (req, res) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    let dbase = db.db("TodoMongoDB");
    dbase
      .collection("Todo")
      .find({})
      .toArray(function (err, result) {
        var array;

        array = result;

        let flse = "false";
        let c = array.filter((item) => {
          return item.isCompleted === flse;
        });
        var len = c.length;
        console.log(c.length);
        res.render("Mongo", { array: array, len: len });
      });
  });
});
app.get("/all", function (req, res) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    let dbase = db.db("TodoMongoDB");
    dbase
      .collection("Todo")
      .find({})
      .toArray(function (err, result) {
        var array;
        array = result;
        let flse = "false";
        let c = array.filter((item) => {
          return item.isCompleted === flse;
        });
        var len = c.length;
        console.log(c.length);
        res.render("Mongo", { array: array, len: len });
      });
  });
});
app.get("/active", function (req, res) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    let dbase = db.db("TodoMongoDB");
    dbase
      .collection("Todo")
      .find({})
      .toArray(function (err, result) {
        var array = result;
        console.log(array);

        array = array.filter((item) => {
          return item.isCompleted == "false";
        });
        console.log(array);
        console.log(array.length);
        let flse = "false";
        let c = result.filter((item) => {
          return item.isCompleted === flse;
        });
        var len = c.length;
        console.log(c.length);
        res.render("Mongo", { array: array, len: len });
      });
  });
});
app.get("/completed", function (req, res) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    let dbase = db.db("TodoMongoDB");
    dbase
      .collection("Todo")
      .find({})
      .toArray(function (err, result) {
        let array = result;
        array = array.filter((item) => {
          return item.isCompleted == "true";
        });
        let flse = "false";
        let c = array.filter((item) => {
          return item.isCompleted === flse;
        });
        var len = c.length;
        console.log(c.length);
        res.render("Mongo", { array: array, len: len });
      });
  });
});
app.post("/deleteall",function(req,res)
{
     MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    let dbase = db.db("TodoMongoDB");
    dbase
      .collection("Todo").deleteMany({isCompleted:"true"},function(err,obj)
      {
        if(err) throw err;
        res.redirect("/");
      })

        
      })
    })

app.listen(8080, function () {
  console.log("server is running on port 8080");
});
