const express = require("express");
var app = express();
app.use(express.static("public"));
var cors = require("cors");
app.options("*", cors());
app.use(cors());
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.post("/", (req, res) => {
 res.send({"err":"KK"})
});
app.listen(2000);
