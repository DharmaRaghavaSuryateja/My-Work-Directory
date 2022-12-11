var express = require("express");
var bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
var mongodb = require("mongodb");
const { count } = require("console");
var url = "mongodb://localhost:27017/UserInfo";
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
//render css files
app.use(express.static("public"));
var array = [];
app.post("/adddetails", function (req, res) {
  var name = req.body.name;
  var email = req.body.email;
  var phone = req.body.phone;
  var address = req.body.address;
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    let dbase = db.db("UserInfo");
    var obj = {
      name: name,
      email_text_text: email,
      phone: phone,
      address: address,
    };
    dbase
      .collection("Task")
      .find({})
      .toArray(function (err, result) {
        array = result;
        function count() {
          let ary = array.filter((item) => {
            return item.email_text_text == obj.email_text_text;
          });
          console.log(ary.length);
          return ary.length;
        }

        if (count() > 0) {
          return res.redirect("/abc");
        } else {
          dbase.collection("Task").insertOne(obj, function (err, resultt) {
            if (err) throw err;
            console.log("Inserted");
            dbase
              .collection("Task")
              .find({})
              .toArray(function (err, result) {
                array = result;
                db.close();
                res.redirect("/");
              });
          });
        }
      });
   
  });
});
app.post("/del/:ide", function (req, res) {
  var x = new mongodb.ObjectId(req.params.ide);
  console.log(x);
  var y = { _id: x };
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    let dbase = db.db("UserInfo");
    dbase.collection("Task").deleteOne(y, function (err, obj) {
      if (err) throw err;
      console.log("deleted");
      dbase
        .collection("Task")
        .find({})
        .toArray(function (err, result) {
          array = result;
          db.close();
          res.redirect("/");
        });
    });
  });
});
app.post("/update/:idee", function (req, res) {
  var s1 = new mongodb.ObjectId(req.params.idee);
  var nameupdated = req.body.xname;
  var emailupdated = req.body.xemail;
  var phoneupdated = req.body.xphone;
  var addressupdated = req.body.xaddress;
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    let dbase = db.db("UserInfo");
    var q = { _id: s1 };
    var newval = {
      $set: {
        name: nameupdated,
        email_text_text: emailupdated,
        phone: phoneupdated,
        address: addressupdated,
      },
    };
    dbase.collection("Task").updateOne(q, newval, function (err, result) {
      if (err) throw err;
      dbase
        .collection("Task")
        .find({})
        .toArray(function (err, result) {
          array = result;
          db.close();
          res.redirect("/");
        });
    });
  });
});
app.post("/edit/:par", function (req, res) {
  var iad = new mongodb.ObjectId(req.params.par);
  var list1 = req.body.m;
  var list2 = req.body.n;
  var list3 = req.body.o;
  var list4 = req.body.p;
  res.render("update", { iad, list1, list2, list3, list4 });
});
app.get("/", function (req, res) {
  if (req.params.error) {
  }
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    let dbase = db.db("UserInfo");
    dbase
      .collection("Task")
      .find({})
      .toArray(function (err, result) {
        var array = result;
        res.render("Homepage", { array: array });
      });
  });
});
app.get("/abc", function (req, res) {
  res.render("abc");
});

app.listen(8080, function () {
  console.log("server is running on port 8080");
});
