import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TeachingSchedule from "./pages/TeachingSchedule";
import Feedback from "./pages/Feedback";

import Courses from "./pages/Courses";
import StudentAttendanceList from "./pages/StudentAttendanceList";
import StudentList from "./pages/StudentList";
import TeachingClass from "./pages/TeachingClass";
import Grades from "./pages/Grades";
import StudentLayout from "./layouts/StudentLayout";
import StudentSchedule from "./pages/StudentSchedule";
import AcademicResults from "./pages/AcademicResults";
import Dashboard from "./pages/admin/DashBoard";
import CourseManagement from "./pages/admin/CourseManagement";
import ClassesManagement from "./pages/admin/ClassesManagement";
import UserManagement from "./pages/admin/UserManagement";
import Notifications from "./pages/Notifications";

function App() {
  return (
    <Router>
      <Routes>
        {/* Các route dùng chung layout Teacher */}
        <Route path="/" element={<TeachingSchedule />} />
        <Route path="/teaching/schedule" element={<TeachingSchedule />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/courses" element={<Courses />} />
        <Route
          path="/teaching/attendance"
          element={<StudentAttendanceList />}
        />
        <Route path="/teaching/class" element={<TeachingClass />} />
        <Route path="/teaching/grades" element={<Grades />} />
        <Route
          path="/student-attendance-list"
          element={<StudentAttendanceList />}
        />
        <Route path="/student-list" element={<StudentList />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/courses" element={<CourseManagement />} />
        <Route path="/admin/classes" element={<ClassesManagement />} />
        <Route path="/admin/users" element={<UserManagement />} />

        {/* Các route dùng chung layout Student */}
        <Route path="/student" element={<StudentLayout />}>
          <Route path="schedule" element={<StudentSchedule />} />
          <Route path="results" element={<AcademicResults />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
