import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TeachingSchedule from "./pages/TeachingSchedule";
import Feedback from "./pages/Feedback";
import ClassNotifications from "./pages/ClassNotifications";
import CourseManagement from "./pages/admin/CourseManagement";
import StudentAttendanceList from "./pages/StudentAttendanceList";
import StudentList from "./pages/StudentList";
import Dashboard from "./pages/admin/DashBoard";
import ClassesManagement from "./pages/admin/ClassesManagement";
import UserManagement from "./pages/admin/UserManagement";
import Courses from "./pages/Courses";
function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<TeachingSchedule />} />
        <Route path="/teaching-schedule" element={<TeachingSchedule />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/notifications" element={<ClassNotifications />} />
        <Route path="/courses" element={<Courses />} />
        <Route
          path="/student-attendance-list"
          element={<StudentAttendanceList />}
        />
        <Route path="/student-list" element={<StudentList />} /> */}
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/courses" element={<CourseManagement />} />
        <Route path="/admin/classes" element={<ClassesManagement />} />
        <Route path="/admin/users" element={<UserManagement />} />
      </Routes>
    </Router>
  );
}

export default App;
