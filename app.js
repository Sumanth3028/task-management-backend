const path = require("path");

const bodyParser = require("body-parser");

require('dotenv').config()

const express = require("express");

const cors = require("cors");

const app = express();

const Sequelize = require("./util/database");

const userRoutes = require("./routes/userRoutes");

const taskRoutes=require('./routes/taskRoutes')

const User=require('./Models/user')

const Tasks=require('./Models/task')

app.use(cors());

app.use(bodyParser.json({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(userRoutes);
app.use(taskRoutes)

// User.hasMany(Tasks)
// Tasks.belongsTo(User)
Sequelize.sync()
  .then(() => {
    app.listen(process.env.PORT);
  })
  .catch((err) => {
    return err;
  });
