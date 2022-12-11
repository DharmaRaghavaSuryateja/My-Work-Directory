const express = require("express");
const router = express.Router();
const path = require("path");
const enrolledCourseTable = require("../models/EnrolledCourses");
const courseTable = require("../models/Course");
const userT = require("../models/User");
const authentication = require("../middlewaare/tokenauthentication");
const sequelize = require("../db/sequelize");
var xyz;
router.post("/student_courses", authentication, async (req, res) => {
  let data = await courseTable.findAll({});

  res.json({ arr: req.user, data: data });
});
router.get("/student_courses", authentication, async (req, res) => {
  res.render("studentCourse.html");
});
router.post("/random1", async (req, res) => {
  xyz = req.body.id;
  res.redirect("/viewCourse");
});

router.post("/viewCourse", authentication, async (req, res) => {
  if (typeof xyz !== "undefined") {
    var id = xyz;
  }
  console.log(id);
  console.log(req.user);
  let data = await courseTable.findOne({
    where: {
      id: id,
    },
  });
  console.log(data.dataValues.id);
  let user = await userT.userTable.findOne({
    where: {
      id: data.dataValues.createdBy,
    },
  });
  let enroll = await enrolledCourseTable.findAll({
    where: {
      sid: req.user.id,
    },
  });
  res.json({
    data: data.dataValues,
    owner: user,
    user: req.user,
    enroll: enroll,
  });
});

router.get("/viewCourse", authentication, async (req, res) => {
  res.render("viewCourse");
});

router.post("/myProfile", authentication, async (req, res) => {
  let id = req.user.id;
  let newid = JSON.stringify(id);
  console.log(newid);
  const [result, metadata] = await sequelize.query(
    `SELECT * FROM Courses WHERE id IN (SELECT cid FROM EnrolledCourses WHERE sid=${newid})`
  );
  const enrollTable = await enrolledCourseTable.findAll({
    where: {
      sid: req.user.id,
    },
  });
  res.json({ result: result, user: req.user, enrollTable: enrollTable });
});

router.get("/myProfile", authentication, (req, res) => {
  // res.render("myprofilestudent.html");
  res.sendFile(
    path.join("/Users/dharmaraghavasuryateja/Desktop/Student-Teacher/views","myprofilestudent.html"))
});

router.post("/addToTraining", authentication, async (req, res) => {
  await enrolledCourseTable.create({
    sid: req.body.sid,
    cid: req.body.cid,
    isCompleted: false,
  });
  res.redirect("/viewCourse");
});

router.post("/markCompleted", async (req, res) => {
  await enrolledCourseTable.update(
    {
      isCompleted: req.body.isCompleted,
    },
    {
      where: {
        sid: req.body.userid,
        cid: req.body.courseid,
      },
    }
  );
  res.redirect("/myProfile");
});

// router.post("/enroll", authentication, async (req, res) => {
//   await enrolledCourseTable.create({
//     sid: req.user.dataValues.id,
//     cid: req.params.cid,
//     isCompleted: false,
//   });
// });

// router.post("/studentRating",(req,res)={

// })

router.post("/studentRating", async (req, res) => {
  await courseTable.update(
    {
      rating: req.body.rating,
    },
    {
      where: {
        id: req.body.cid,
      },
    }
  );
  res.redirect("/myProfile");
});

router.post("/deleteCourse", authentication, async (req, res) => {
  console.log(req.body);
  await enrolledCourseTable.destroy({
    where: {
      sid: req.body.userid,
      cid: req.body.courseid,
    },
  });
  res.redirect("/myProfile");
});
module.exports = router;
