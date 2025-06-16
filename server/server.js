const express = require("express");
require("dotenv").config();
const app = express();
const connectDB = require("./connect/database");

app.use(express.json());

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