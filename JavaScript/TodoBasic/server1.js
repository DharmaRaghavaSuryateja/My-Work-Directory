var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
//render css files
app.use(express.static("public"));
var list = [];
app.post("/addtolist", function (req, res) {
  var p = req.body.liste;

  list.push(p);
  res.redirect("/");
  
});
app.post("/remove/:i", function (req, res) {
  list.splice(req.params.i, 1);

  res.redirect("/");
});
app.get("/", function (req, res) {
  res.render("index1", { list:list});
});
app.listen(3000, function () {
  console.log("server is running on port 3000");
});
