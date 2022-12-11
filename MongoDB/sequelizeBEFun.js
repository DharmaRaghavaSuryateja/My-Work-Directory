
const { Sequelize, DataTypes } = require("sequelize");

var sequelize = new Sequelize("mydbs", "dharmaraghavasuryateja", "Goldtre9", {
  host: "localhost",
  dialect: "postgres",
  define: {
    timestamps: false,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

var mytbl = sequelize.define("mytbls", {
  _id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  list: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isCompleted: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

sequelize
  .sync()
  .then(() => {
    console.log("mytbl table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table : ", error);
  });
console.log(mytbl + "lllllllllllllllllll");

exports.addlist = async function (req, res) {
 
    var abcde = req.body.list;
    // console.log(req.body);
    console.log(abcde);
    console.log(mytbl);
    try {
      var result = await mytbl.create({
        list: abcde,
        isCompleted: "false",
      });
    } catch (error) {
     return res.send(error);
    }

      res.send(result);
   
};

exports.delete = async function (req, res) {
  
    var id = req.params.id;
    console.log(id);
    try {
       await mytbl.destroy({
        where: { _id: id },
      });
    } catch(error) {
      return res.send(error);
    }
      res.end();
    
};
exports.update = async function (req, res) {
 
    var ide = req.params.ide;
     try {
       if (req.body.isCompleted === "false") {
         await mytbl.update(
           {
             isCompleted: "true",
           },
           {
             where: { _id: ide },
           }
         );
       } else {
         await mytbl.update(
           {
             isCompleted: "false",
           },
           {
             where: { _id: ide },
           }
         );
       }
     } catch (error) {
       return res.send(error);
     }
   res.end();
};
exports.deleteall = async function (req, res) {
  try {
      await mytbl.destroy({
      where: { isCompleted: "true" },
    });

    
  } catch (error) {
    return res.send(error);
  }
  res.end();
};

exports.output = async function (req, res) {
  let arrayp = [];
  let lenarray = [];
  let filterr = req.params.filterr;
  try {
    var result = await mytbl.findAll({});
  }
    catch (error) {
    return res.send(error);
  }
    result = result.sort(function (a, b) {
      return a._id - b._id;
    });;
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
    console.log(arrayp);
    console.log(result);
    res.json({
      arrae: arrayp,
      count: lenarray.length,
    });
  
};
