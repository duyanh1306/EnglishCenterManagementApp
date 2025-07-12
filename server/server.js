const express = require("express");
const cors = require('cors');
require("dotenv").config();
const app = express();
const connectDB = require("./connect/database");
const classRoute = require('./routes/classRoute');
const userRoute = require('./routes/userRoute');
const roleRoute = require('./routes/roleRoute');

// Configure CORS to allow requests from your React frontend
const corsOptions = {
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'], // Allow both localhost and 127.0.0.1
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api/classes',classRoute );
app.use('/api/users',userRoute);
app.use('/api/roles',roleRoute);
app.use('/api/teacher', require('./routes/teacherRoute'));
app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to ExpressJS" });
  });

// app.use('/api', require('./routes/blog.route'));

  const PORT = process.env.PORT || 9999;
  const HOSTNAME = 'localhost';

  app.listen(PORT, HOSTNAME, () => {
    console.log(`✅ Server is running at http://${HOSTNAME}:${PORT}`);
    connectDB();
  });