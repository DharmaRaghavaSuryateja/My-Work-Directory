const mongoose = require("mongoose");
const todoTaskSchema = new mongoose.Schema(
  {
    list: String,
    isCompleted: String,
  },
  {
    versionKey: false,
  }
);
const ss = mongoose.model("ss", todoTaskSchema);
//new mongoose.Types.ObjectId(_id)
exports.addlist = function (req, res) {
  var list1 = new ss({ list: req.body.name, isCompleted: "false" });
  list1.save((err) => {
    if (err) {
      throw err;
    }
    res.redirect("/");
  });
};
exports.delete = function (req, res) {
  var id = new mongoose.Types.ObjectId(req.params.id);
  ss.findByIdAndDelete(id, (err) => {
    if (err) throw err;
    res.redirect("/");
  });
};
exports.update = function (req, res) {
  var ide = new mongoose.Types.ObjectId(req.params.ide);
  if (req.body.check === "false") {
    ss.findByIdAndUpdate(ide, { isCompleted: "true" }, (err) => {
      if (err) throw err;
      res.redirect("/");
    });
  } else {
    ss.findByIdAndUpdate(ide, { isCompleted: "false" }, (err) => {
      if (err) throw err;
      res.redirect("/");
    });
  }
};
exports.deleteall = function (req, res) {
  ss.deleteMany({ isCompleted: "true" }, (err) => {
    if (err) throw err;
    res.redirect("/");
  });
};

exports.output = function (req, res) {
  let arrayp = [];
  let lenarray = [];
  let filterr = req.params.filterr;
  ss.find({}, (err, result) => {
    if (err) throw err;

    if (filterr === "all") {
      arrayp = result;
    } else if (filterr === "active") {
      arrayp = result;
      arrayp = arrayp.filter((item) => {
        return item.isCompleted === "false";
      });
    } else if (filterr === "completed") {
      arrayp = result;
      arrayp = arrayp.filter((item) => {
        return item.isCompleted === "true";
      });
    } else {
      arrayp = result;
    }
    lenarray = result.filter((item) => {
      return item.isCompleted === "false";
    });

    return res.render("mongoejs", { array: arrayp, len: lenarray.length });
  });
};
