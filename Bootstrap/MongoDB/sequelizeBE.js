var express = require("express");
var bodyParser = require("body-parser");
const { Sequelize, DataTypes } = require("sequelize");
var app = express();
app.use(express.json());
var cors = require("cors");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
const mvc = require("./sequelizeBEFun");
app.post("/addlist", mvc.addlist);
app.post("/delete/:id",mvc.delete);
app.post("/update/:ide", mvc.update);
app.post("/deleteall", mvc.deleteall);
app.get("/hey/:filterr?", mvc.output);
app.listen(8000);


