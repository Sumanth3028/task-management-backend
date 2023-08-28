const path = require("path");

const bodyParser = require("body-parser");

require("dotenv").config();

const express = require("express");

const cors = require("cors");

const app = express();

const Sequelize = require("./util/database");

const userRoutes = require("./routes/userRoutes");

const taskRoutes = require("./routes/taskRoutes");

const User = require("./Models/user");

const Tasks = require("./Models/task");
const corsOptions = {
  origin: 'https://task-management-ten-iota.vercel.app/',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Include cookies in CORS requests (if applicable)
  optionsSuccessStatus: 204 // Set the status code for preflight requests
};

app.use(cors({corsOptions}));

app.use(bodyParser.json({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(userRoutes);
app.use(taskRoutes);

// app.use((req, res) => {
//   console.log("req",req.url)
//   res.sendFile((path.join(__dirname, "public/build/index.html")))
  
// });


Sequelize.sync()
  .then(() => {
    app.listen(process.env.PORT);
  })
  .catch((err) => {
    return err;
  });
