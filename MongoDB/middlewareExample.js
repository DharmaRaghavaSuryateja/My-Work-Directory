const express = require("express");
const app = express();

app.use((req, res, next)=> {
  console.log(`${new Date().toISOString()}: ${req.originalUrl}`);
  next();
});

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.get("/users",(req,res,next)=>{if (req.query.admin === "true") {
  req.admin = true;
  next();
} else {
  res.send("ERROR: You must be an admin");
}}, (req, res) => {
  console.log(req.admin);
  res.send("Users Page");
});



app.listen(3000, () => console.log("Server Started"));
