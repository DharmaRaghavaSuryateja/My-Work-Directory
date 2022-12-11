const bycrypt = require("bcryptjs");
const user = require("../models/User");
const jwt = require("jsonwebtoken");
const Sequelize = require("sequelize");
const { QueryTypes } = require("sequelize");
const sequelize = require("../db/sequelize");
const { Op } = require("sequelize");

const authentication = async (req, res, next) => {
  const token = req.cookies.token;
  //if one user click logout then all the accounts will be logged out,So if remaining users click on logout there will be no token so if there is no token redirect to login page
  if(!token){
   return res.redirect("/login")
  }
  try {
    var values = jwt.verify(token, process.env.JWT_SECRET);
    console.log(values+"kk");
  } catch (error) {
    res.redirect("/login");
  }
  console.log(values);
  let userdetails = await user.userTable.findOne({
    where: {
      id: values.id,
    },
  });
  console.log(userdetails);
  try {
    if (userdetails) {
      req.token = token;
      req.user = userdetails;
      next();
    } else {
      throw new Error();
    }
  } catch (error) {
    res.send("<h1 style='text-align:center'>Authentication Failed</h1>");
  }
};

module.exports = authentication;
