const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Sequelize, DataTypes } = require("sequelize");
var sequelize = require("../db/sequelize");
const userTable = sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  occupation: {
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

async function generateToken(id) {
  const token = jwt.sign({ id: id.toString() }, process.env.JWT_SECRET);
  console.log(token)
  return token;
}

module.exports = { userTable, generateToken };
