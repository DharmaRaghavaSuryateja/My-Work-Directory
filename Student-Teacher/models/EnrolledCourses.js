const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");
const enrolledCourseTable = sequelize.define("EnrolledCourses", {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  sid: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cid: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isCompleted: {
    type: DataTypes.BOOLEAN,
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
module.exports = enrolledCourseTable;
