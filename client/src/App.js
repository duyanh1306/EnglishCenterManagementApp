import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import TeacherLayout from "./layouts/TeacherLayout";
import Courses from "./pages/teacher/Courses";
import TeachingSchedule from "./pages/teacher/TeachingSchedule";
import TeachingClass from "./pages/teacher/TeachingClass";
import Grades from "./pages/teacher/Grades";

import StudentLayout from "./layouts/StudentLayout";
import StudentSchedule from "./pages/student/StudentSchedule";
import AcademicResults from "./pages/student/AcademicResults";
import RegisterClass from "./pages/student/RegisterClass";
import StudentNotifications from "./pages/student/StudentNotifications";
import Attendance from "./pages/student/Attendance";
import MyClasses from "./pages/student/MyClasses";
import ClassDetails from "./pages/student/ClassDetails";

import Dashboard from "./pages/admin/DashBoard";
import CourseManagement from "./pages/admin/CourseManagement";
import ClassesManagement from "./pages/admin/ClassesManagement";
import UserManagement from "./pages/admin/UserManagement";

import LoginPage from "./Login/Login";


function App() {
  return (
      <Router>
        <Routes>

          {/* Login */}
          <Route path="/login" element={<LoginPage />} />

          {/* Các route dùng chung layout Teacher */}
          <Route path="/teacher" element={<TeacherLayout />} >
            <Route path="courses" element={<Courses />} />
            <Route path="schedule" element={<TeachingSchedule />} />
            <Route path="classes" element={<TeachingClass />} />
            <Route path="grades" element={<Grades />} />
          </Route >

          {/* Các route dùng chung layout Admin */}
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/courses" element={<CourseManagement />} />
          <Route path="/admin/classes" element={<ClassesManagement />} />
          <Route path="/admin/users" element={<UserManagement />} />

          {/* Các route dùng chung layout Student */}
          <Route path="/student" element={<StudentLayout />}>
            <Route path="schedule" element={<StudentSchedule />} />
            <Route path="results" element={<AcademicResults />} />
            <Route path="my-classes" element={<MyClasses />} />
            <Route path="register-class" element={<RegisterClass />} />
            <Route path="my-classes/:classId" element={<ClassDetails />} />
            <Route path="notifications" element={<StudentNotifications />} />
            <Route path="attendance" element={<Attendance />} />
          </Route>
        </Routes>
      </Router>
  );
}

export default App;
