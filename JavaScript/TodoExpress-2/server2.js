var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
//render css files
app.use(express.static("public"));

//placeholders for added task
var task = [];
//placeholders for removed task
var complete = [];

//post route for adding new task
app.post("/addtask", function (req, res) {
  var newTask = { caption: req.body.newtask, isCompleted: false };
  console.log(newTask.isCompleted);
  //add the new task from the post route
  task.push(newTask);
  res.redirect("/");
});

app.post("/removetask/:i", function (req, res) {
  var completeTask = { caption: req.body.check, isCompleted: true };
  task.splice(req.params.i, 1);

  res.redirect("/");
});
app.post("/check/:i", (req, res) => {
  console.log(Boolean(req.body.check));
  console.log(req.params.i);
  complete.push({ caption: task[req.params.i].caption, isCompleted: false });
  task.splice(req.params.i, 1);
  console.log(complete);
  res.redirect("/");
});

app.post("/del/:i", (req, res) => {
  complete.splice(req.params.i, 1);
  res.redirect("/");
});
app.post("/def/:i", (req, res) => {
  task.push({ caption: complete[req.params.i].caption, isCompleted: false });
  complete.splice(req.params.i, 1);
  res.redirect("/");
});

//render the ejs and display added task, completed task
app.get("/", function (req, res) {
  res.render("index2", { task: task, complete: complete });
});

//set app to listen on port 3000
app.listen(8080, function () {
  console.log("server is running on port 8080");
});
