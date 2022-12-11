// Importing the express module
const express = require("express");
const app = express();

// Creating First Middleware
app.get("/", (req, res, next) => {
  console.log("Hello");
  res.send("hello2");

  console.log("p");
  // The next() function called
});

// Creating second middleware
app.get("/", (req, res, next) => {
  console.log("Get Request");
  
  next();
});
app.get("/", (req, res, next) => {
  console.log("Get Request2");
});
app.get("/abc", (req, res, next) => {
  console.log("Get Request3");
  res.send("hello2");
});

// Execution the server
app.listen(3000, () => {
  console.log("Server is Running");
});
