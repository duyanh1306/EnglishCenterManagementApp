import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import TeacherLayout from "./layouts/TeacherLayout";
import Courses from "./pages/teacher/Courses";
import TeachingSchedule from "./pages/teacher/TeachingSchedule";
import TeachingClass from "./pages/teacher/TeachingClass";
import Grades from "./pages/teacher/Grades";

import StudentLayout from "./layouts/StudentLayout";
import StudentSchedule from "./pages/student/StudentSchedule";
<<<<<<< HEAD
import AcademicResults from "./pages/student/AcademicResults";
=======

import Dashboard from "./pages/admin/DashBoard";
import CourseManagement from "./pages/admin/CourseManagement";
import ClassesManagement from "./pages/admin/ClassesManagement";
import UserManagement from "./pages/admin/UserManagement";
import Notifications from "./pages/Notifications";

>>>>>>> Dungnt
import RegisterClass from "./pages/student/RegisterClass";
import Attendance from "./pages/student/Attendance";
import MyClasses from "./pages/student/MyClasses";
import ClassDetails from "./pages/student/ClassDetails";
<<<<<<< HEAD

import Dashboard from "./pages/admin/DashBoard";
import CourseManagement from "./pages/admin/CourseManagement";
import ClassesManagement from "./pages/admin/ClassesManagement";
import UserManagement from "./pages/admin/UserManagement";




=======
import ExamSchedule from "./pages/student/ExamSchedule";
import StudentGrades from "./pages/student/Grades";
import GradeDetails from "./pages/student/GradeDetails";
import AttendanceList from "./pages/student/AttendanceList";
import AttendanceDetail from "./pages/student/AttendanceDetail";
import StudentDashboard from "./pages/student/StudentDashboard";
>>>>>>> Dungnt
function App() {
  return (
    <Router>
      <Routes>
        

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

          <Route path="my-classes" element={<MyClasses />} />
          <Route path="register-class" element={<RegisterClass />} />
          <Route path="my-classes/:classId" element={<ClassDetails />} />
<<<<<<< HEAD
          <Route path="notifications" element={<StudentNotifications />} />
          <Route path="attendance" element={<Attendance />} />
=======

          {/* <Route path="attendance" element={<Attendance />} /> */}
          <Route path="exam-schedule" element={<ExamSchedule />} />
          <Route path="grade" element={<StudentGrades />} />
          <Route path="grade/:classId" element={<GradeDetails />} />
          <Route path="attendance" element={<AttendanceList />} />
          <Route path="attendance/:classId" element={<AttendanceDetail />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
>>>>>>> Dungnt
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
