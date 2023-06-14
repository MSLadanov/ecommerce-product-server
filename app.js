require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const app = express();

const port = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("Hello world");
});

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
