const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");
const categoryTable = sequelize.define("Category", {
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});
sequelize
  .sync()
  .then(() => {
    console.log("mytbl table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table : ", error);
  });
module.exports = categoryTable;
