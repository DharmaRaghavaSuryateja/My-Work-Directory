let bycrypt = require("bcryptjs");
const user = require("../models/User");
var express = require("express");
const router = express.Router();
const authentication = require("../middlewaare/tokenauthentication");
let cookieParser = require("cookie-parser");
router.use(cookieParser());

router.get("/home", async (req, res) => {
  let data = await user.userTable.findAll({});
  res.json({ data: data });
});

router.post("/errorRoute",(req, res) => {
  let a=req.body.message;
  console.log(a)
  res.json({ "message": a});
});
//Register
router.post("/register", async (req, res) => {
  let hashpassword = await bycrypt.hash(req.body.password, 8);
  let x = await user.userTable.create({
    name: req.body.name,
    email: req.body.email,
    password: hashpassword,
    occupation: req.body.occupation,
  });
  console.log(x);
  let token = await user.generateToken(x.dataValues.id);
  res.cookie("token", token, { expire: 400000 + Date.now() });
  res.redirect(`/${req.body.occupation}_courses`);
});
router.get("/register", async (req, res) => {
  res.render("register.html");
});
//login
router.post("/login", async (req, res) => {
  if (req.cookies.token) {
    return res.json({ alert: "Please logout from another device" });
  }
  let hashpassword = await user.userTable.findOne({
    where: {
      email: req.body.email,
    },
  });

  let result = await bycrypt.compare(
    req.body.password,
    hashpassword.dataValues.password
  );
  if (result) {
    console.log(result);
    let token = await user.generateToken(hashpassword.dataValues.id);
    res.cookie("token", token, {
      expire: 400000 + Date.now(),
    });

    console.log("tt");
    res.redirect(`/${hashpassword.dataValues.occupation}_courses`);
  } else {
    await fetch("http://localhost:3333/errorRoute", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ message: "Invalid password!" }),
    });
    res.redirect("/login");
  }
});

router.get("/login", async (req, res) => {
  res.render("login.html");
});

router.post("/logout", authentication, async (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
});
module.exports = router;
