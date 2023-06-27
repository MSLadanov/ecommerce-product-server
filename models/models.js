const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  surname: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: "USER",
  },
  img: {
    type: DataTypes.STRING,
  },
});

const Basket = sequelize.define("basket", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  data: {
    type: DataTypes.STRING(4096),
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Sneakers = sequelize.define("sneakers", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  brand: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sex: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  size: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(4096),
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  discount: {
    type: DataTypes.INTEGER,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  img1: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  img2: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  img3: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  img4: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});


User.hasOne(Basket)
Basket.belongsTo(User)

module.exports = {
    User, Basket, Sneakers
}