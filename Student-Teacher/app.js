require("dotenv").config({ path: "./config/.env" });
require("./db/sequelize");
var express = require("express");
var app = express();
var multer = require("multer");
var upload = multer({ storage: multer.memoryStorage() });
app.use(upload.array());
app.use(express.static("public"));
var cors = require("cors");
app.options("*", cors());
app.use(cors());
const port = process.env.PORT;
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const path = require("path");
app.set("views", path.join(__dirname, "views"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.use(express.json({ type: "*/*" }));
const { Sequelize, DataTypes } = require("sequelize");
var userRoute = require("./routes/userRoute");
app.use("/", userRoute);
var teacherRoute = require("./routes/teacherRoute");
app.use("/", teacherRoute);
var studentRoute = require("./routes/studentRoute.js");
app.use("/", studentRoute);
app.listen(port);
