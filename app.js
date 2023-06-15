require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const models = require('./models/models')
const cors = require('cors')
const app = express();
const router = require('./routes/index')

const port = process.env.PORT || 3001;

app.use(cors())
app.use(express.json())
app.use('/api', router)
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
