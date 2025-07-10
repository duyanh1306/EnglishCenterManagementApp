const express = require("express");
require("dotenv").config();
const app = express();
const cors = require('cors');
const connectDB = require("./connect/database");
const classRoute = require('./routes/classRoute');
const userRoute = require('./routes/userRoute');
const roleRoute = require('./routes/roleRoute');
const courseRoute = require('./routes/courseRoute');
const teacherRoute = require('./routes/teacherRoute');
app.use(cors());
app.use(express.json());
app.use('/api/classes',classRoute );
app.use('/api/users',userRoute);
app.use('/api/roles',roleRoute);
app.use('/api/courses',courseRoute);
app.use('/api/teacher',teacherRoute);
app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to ExpressJS" });
  });

// app.use('/api', require('./routes/blog.route'));

  const PORT = process.env.PORT || 9999;
  const HOSTNAME = '0.0.0.0';

  app.listen(PORT, HOSTNAME, () => {
    console.log(`✅ Server is running at http://${HOSTNAME}:${PORT}`);
    connectDB();
  });