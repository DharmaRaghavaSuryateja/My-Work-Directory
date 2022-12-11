var express = require("express");
var cookieParser = require("cookie-parser");
const session = require("express-session");

var app = express();

app.use(cookieParser());

app.get("/", function (req, res) {
  res.cookie('session_id', 123456).send("hello");
});
app.get("/abc",validation, (req, res) => {
  res.send("logged")
  
});
function validation(req,res,next)
{
    const {cookies}=req;
  if('session_id' in cookies)
  {
    console.log(req.cookies)
    next();
  }
  else{
    res.send("error");
  }
}
app.listen(3000);
