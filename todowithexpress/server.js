// var express = require("express");
// var app = express();

// // set the view engine to ejs
// app.set("view engine", "ejs");

// // use res.render to load up an ejs view file

// // index page
// var bodyParser = require("body-parser");
// app.use(bodyParser.urlencoded({ extended: true }));
// app.get("/", function (req, res) {
//   res.render("pages/index", {
//     task: [
//       {
//         caption: "first",
//         isCompleted: false,
//       },
//       {
//         caption: "second",
//         isCompleted: false,
//       },
//     ],
//   });
// });
// app.post("/addTodo", function (req, res) {
//   res.send(req.body.caption);
// });
// // about page

// app.listen(8080);
// console.log("Server is listening on port 8080");
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
  var newTask = req.body.newtask;
  //add the new task from the post route
  task.push(newTask);
  res.redirect("/");
});

app.post("/removetask", function (req, res) {
  var completeTask = req.body.check;
  //check for the "typeof" the different completed task, then add into the complete task
  if (typeof completeTask === "string") {
    complete.push(completeTask);
    //check if the completed task already exits in the task when checked, then remove it
    task.splice(task.indexOf(completeTask), 1);
  } else if (typeof completeTask === "object") {
    for (var i = 0; i < completeTask.length; i++) {
      complete.push(completeTask[i]);
      task.splice(task.indexOf(completeTask[i]), 1);
    }
  }
  res.redirect("/");
});
app.post("/del", (req, res) => {
  var abc = req.body.chek;
  if (typeof abc === "string") {
    complete.splice(complete.indexOf(abc[i]), 1);
  } else if (typeof abc === "object") {
    for (var i = 0; i < abc.length; i++) {
      complete.splice(complete.indexOf(abc[i]), 1);
    }
  }
  res.redirect("/");
});

//render the ejs and display added task, completed task
app.get("/", function (req, res) {
  res.render("index", { task: task, complete: complete });
});

//set app to listen on port 3000
app.listen(8080, function () {
  console.log("server is running on port 8080");
});
