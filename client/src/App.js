import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


// Teacher pages
import TeachingClass from "./pages/TeachingClass";
import TeachingSchedule from "./pages/TeachingSchedule";
import Feedback from "./pages/Feedback";
import Notifications from "./pages/Notifications";
import Courses from "./pages/Courses";
import StudentAttendanceList from "./pages/StudentAttendanceList";
import StudentList from "./pages/StudentList";
import Grades from "./pages/Grades";

// Student pages
import AcademicResults from "./pages/AcademicResults";
import StudentLayout from "./layouts/StudentLayout";
import StudentSchedule from "./pages/StudentSchedule";


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
        <Route path="/teaching/attendance" element={<StudentAttendanceList />} />
        <Route path="/teaching/class" element={<TeachingClass />} />
        <Route path="/teaching/grades" element={<Grades />} />
        <Route path="/student-list" element={<StudentList />} />

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
