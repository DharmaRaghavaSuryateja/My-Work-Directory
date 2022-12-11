var express = require("express");
var bodyParser = require("body-parser");
var app = express();



app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
//render css files
app.use(express.static("public"));
const abc = require("./routes/tasktodo");
app.use("/",abc)






app.listen(3000, function () {
  console.log("server is running on port 3000");
});
