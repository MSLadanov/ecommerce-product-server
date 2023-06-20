require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const models = require('./models/models')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const app = express();
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')

const port = process.env.PORT || 3001;

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)
app.get("/", (req, res) => {
  res.send("Hello world");
});

// Last handler
app.use(errorHandler)

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
