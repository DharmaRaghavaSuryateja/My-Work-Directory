var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
//render css files
app.use(express.static("public"));
var l;
app.post("/abcde", function (req, res) {
  l = req.body.name;
res.render("ex",{x:l});
});
app.get("/abc", function (req, res) {
  res.render("ey");
});
app.get("/update",function(req,res)
{
  res.render("ex",{x:l});
})
app.get("/", function (req, res) {
  res.render("ex", { x: l });
});
app.listen(8080, function () {
  console.log("server is running on port 8080");
});
