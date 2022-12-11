const { count } = require("console");
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
exports.addlist = async function (req, res) {
 
    var abcde = req.body.list;
    console.log(req.body);

    var list1 = new ss({ list: abcde, isCompleted: "false" });
    try {
      var result = await list1.save();
    } catch (error) {
      return res.send(error);
    }
     res.send(result);
};
exports.delete = async function (req, res) {
  
    var id = new mongoose.Types.ObjectId(req.params.id);
    console.log(id);
    try {
    await ss.findByIdAndDelete(id);
    } catch(error) {
      return res.send(error);
    }
     res.send(id);
};
exports.update = async function (req, res) {
 
  var ide = new mongoose.Types.ObjectId(req.params.ide);
   try {
     if (req.body.isCompleted === "false") {
       await ss.findByIdAndUpdate(ide, { isCompleted: "true" });
     } else {
      await ss.findByIdAndUpdate(ide, { isCompleted: "false" });
     }
  } catch (error) {
    return res.send(error);
   }
    res.end();
};
exports.deleteall =async function (req, res) {
  try{
  await ss.deleteMany({ isCompleted: "true" })
  }catch(error){
   return res.send(error);
  }
   res.end();
};

exports.output = async function (req, res) {
  let arrayp = [];
  let lenarray = [];
  let filterr = req.params.filterr;
  try {
    var result = await ss.find({});
  } catch(error) {
    return res.send(error);
  }
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

    res.json({
      arrae: arrayp,
      count: lenarray.length,
    });
  
};
