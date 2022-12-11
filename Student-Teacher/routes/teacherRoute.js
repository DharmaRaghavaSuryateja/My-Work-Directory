const express = require("express");
const router = express.Router();
const courseTable = require("../models/Course");
const categoryTable = require("../models/Category");
const user=require("../models/User")
const authentication = require("../middlewaare/tokenauthentication");
var multer = require("multer");
var upload = multer({ storage: multer.memoryStorage() });
var xyz;
var editCourseMiddle;
//posting data to some random route to fetch that data in addcourses.html
router.post("/random",authentication, async (req, res) => {
  let data = await categoryTable.findAll({});
  res.json({ data: data });
});

router.get("/teacher_courses", authentication, async (req, res) => {
  res.render("teacherCourse.html");
});

router.post("/teacher_courses", authentication, async (req, res) => {
  let data = await courseTable.findAll({});
  console.log(data);
  const images = data.map((d) => {
    return d.image;
  });

  res.json({ arr: req.user, data: data, images: images ,user:req.user});
});

router.post(
  "/addcourses",
  authentication,
  upload.single("image"),
  async (req, res) => {
    let response = await courseTable.create({
      createdBy: req.user.dataValues.id,
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      runningTime: req.body.runningTime,
      image: req.body.image,
    });
    let img=req.file;
    console.log(img);

    console.log(response);

    res.redirect("/teacher_courses");
  }
);
router.get("/addcourses", authentication, (req, res) => {
  res.render("addcourses.html");
});

router.post("/newCourseMiddle",authentication, async (req, res) => {
  xyz = req.body.id;
  res.redirect("/newCourse");
});
router.post("/newCourse",authentication, async (req, res) => {
  if (typeof xyz !== "undefined") {
    var ide = xyz;
  }
  let data = await courseTable.findOne({
    where: {
      id: ide,
    },
  }); 
  let users=await user.userTable.findAll({})

  res.json({ data: data.dataValues,user:users });
});
router.get("/newCourse",authentication, (req, res) => {
  res.render("newCourse.html");
});
router.post("/editCourseMiddle",authentication, async (req, res) => {
  editCourseMiddle = req.body.id;
  res.redirect("/editCourse");
});
router.post("/editCourse",authentication, async (req, res) => {
  if (typeof editCourseMiddle !== "undefined") {
    var ide = editCourseMiddle;
  }

  let data = await courseTable.findOne({
    where: {
      id: ide,
    },
  });
  console.log(data);
  res.json({ message: data.dataValues });
});
router.get("/editCourse",authentication, (req, res) => {
  res.render("editCourse.html");
});
router.post("/saveEditedCourse",authentication, async (req, res) => {
  if (typeof editCourseMiddle !== "undefined") {
    var ide = editCourseMiddle;
  }
  await courseTable.update(
    {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      runningTime: req.body.runningTime,
      image: req.body.image,
    },
    {
      where: {
        id: ide,
      },
    }
  );
  res.redirect("/teacher_courses");
});

router.get("/addCategory", authentication, (req, res) => {
  res.render("addCategory.html");
});

router.post("/addCategory", authentication, async (req, res) => {
  await categoryTable.create({
    category: req.body.category,
  });
  res.redirect("/teacher_courses");
});

module.exports = router;
