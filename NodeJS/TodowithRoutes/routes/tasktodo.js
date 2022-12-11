const app = require("express");
const express = require("express");
const router = express.Router();


var list = [];

router.post("/action/:id", function (req, res) {
  if(req.params.id==="add")
  {
  var p = req.body.liste;

  list.push(p);
  res.redirect("/");
  }
  else{
  list.splice(req.params.id, 1);
  res.redirect("/");
  }


  
});
router.get("/", function (req, res, next) {
  res.render("indextask", { list: list });
});



module.exports=router;

