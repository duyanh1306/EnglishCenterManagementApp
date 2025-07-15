const express = require("express");
require("dotenv").config();
const app = express();

const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

const connectDB = require("./connect/database");
const classRoute = require("./routes/classRoute");
const userRoute = require("./routes/userRoute");
const roleRoute = require("./routes/roleRoute");
const studentRoute = require("./routes/studentRoute");

app.use(express.json());
app.use("/api/classes", classRoute);
app.use("/api/users", userRoute);
app.use("/api/roles", roleRoute);

app.use("/api/schedule", require("./routes/scheduleRoute"));
app.use("/api/teacher", require("./routes/teacherRoute"));
app.use("/api/student", studentRoute);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to ExpressJS" });
});

// app.use('/api', require('./routes/blog.route'));

const PORT = process.env.PORT || 9999;
const HOSTNAME = "localhost";

app.listen(PORT, HOSTNAME, () => {
  console.log(`✅ Server is running at http://${HOSTNAME}:${PORT}`);
  connectDB();
});
