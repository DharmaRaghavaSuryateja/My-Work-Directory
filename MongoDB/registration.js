var express = require("express");
var bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/ MongoDatabase";
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
//render css files
app.use(express.static("public"));
var arr = [];
var array = {};
app.post("/adddetails", function (req, res) {
  var name = req.body.name;
  var email = req.body.email;
  var phone = req.body.phone;
  var address = req.body.address;
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    let dbase = db.db("UserInfo");
    var obj = { name: name, email: email, phone: phone, address: address };
    dbase.collection("UserDetails").insertOne(obj, function (err, result) {
      if (err) throw err;
      console.log("Inserted");
      dbase
        .collection("UserDetails")
        .find({}, { projection: { _id: 0 } })
        .toArray(function (err, result) {
          array = result;
          db.close();
          arr = { x: name, y: email, z: phone, p: address };
          //should be written inside find only
          return res.render("RegistrationForm", { arr: arr, array: array });
        });

      console.log("ll");
    });
  });
});

app.get("/", function (req, res) {
  res.render("RegistrationForm", { arr: arr, array: array });
});
app.listen(8080, function () {
  console.log("server is running on port 8080");
});
