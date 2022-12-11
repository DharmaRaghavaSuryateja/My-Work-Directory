var express = require("express");
var app = express();
var cookieParser=require("cookie-parser");
app.use(cookieParser());
// app.get("/", valid, (req, res) => {
//   res.send("author");
// });

// function valid(req, res, next) {
//   if (req.query.admin === "true") {
//     next();
//   } else {
//     res.send(400);
//   }
// }

app.get("/", (req, res) => {
  res.cookie("session_id", 123);
  res.send("cookie is set");
});

app.get("/log", middle, (req, res) => {
  res.send("logged");
});
function middle(req, res, next) {
  const { cookies } = req;
  if ("session_id" in cookies) {
    next();
  } else {
    res.send(400);
  }
}

// app.get("/users/:id",middle,function(req,res)
// {
//     res.send("regular");
// })
// app.get("/users/:id",(req,res)=>
// {
//     res.send("special")
// })
// function middle(req,res,next)
// {
//     if(req.params.id==='0')
//     {
//        next("route");
//     }
//     else{
//         next();
//     }
// }
app.listen(8080);
