const express = require("express");
const session = require("express-session");
var bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { name } = require("ejs");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

app.use(
  session({
    name: "task",
    resave: false,
    saveUninitialized: false,
    secret: "hello",
    cookie: {
      maxAge: 10000000,
      sameSite: true,
    },
  })
);
 let validerr = [];
app.set("view engine", "ejs");
app.post("/xyz", function (req, res) {
  const user = [];
  let validerr = [];
  const name = req.body.name;
  const email = req.body.email;
  var validate =/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  req.session.name=name;
  req.session.email=email;
  const entry = {
    id: user.length + 1,
    name: name,
    email: email,
  };
  user.push(entry);
   if(name==="" && email==="")
   {
    validerr.push("Name Required");
    validerr.push("Email Required");
    return res.render("auth", { validerr:validerr });
   }
  else if(name==='')
   {
    validerr.push("Name Required");
    return res.render("auth", { validerr:validerr });
   }
   
   else if(email==='')
   {
    validerr.push("Email Required");
return res.render("auth", { validerr:validerr });
   }
   
   else if(!email.match(validate))
   {
    validerr.push("Email is Invalid");
    return res.render("auth", { validerr:validerr });
   }
   else
   {
  
     return res.render("output",{name:name,email:email})
   }

  
  
});
app.get("/", (req, res) => {
  return res.render("auth", { validerr: validerr });
});

app.listen(3000, () => console.log("http://localhost:3000"));
