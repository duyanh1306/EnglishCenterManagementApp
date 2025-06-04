const express = require("express");
const morgan = require("morgan");
const connectDB = require("./config/db");
const cors = require("cors"); // npm i cors

const app = express();
app.use(cors());

// Kết nối database
connectDB();

app.use(morgan("dev"));
app.use(express.json());

app.use("/api/users", require("./routes/user.route"));
app.use("/api/courses", require("./routes/course.route"));
app.use("/api/classes", require("./routes/class.route"));

const PORT = process.env.PORT || 9999;
const HOSTNAME = "localhost";

app.listen(PORT, HOSTNAME, () => {
  console.log(`Server is running at http://${HOSTNAME}:${PORT}`);
});
