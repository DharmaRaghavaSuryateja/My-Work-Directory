const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");
const courseTable = sequelize.define("Courses", {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  createdBy: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  runningTime:{
   type:DataTypes.INTEGER,
   allowNull:false
  },
  image: {
    type: DataTypes.BLOB("long"),
  },
  rating: {
    type: DataTypes.INTEGER,
    defaultValue: 5,
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
module.exports = courseTable
