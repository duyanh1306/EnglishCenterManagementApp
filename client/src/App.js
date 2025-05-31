import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TeachingSchedule from './pages/TeachingSchedule';
import Feedback from './pages/Feedback';
import ClassNotifications from './pages/ClassNotifications';
import Courses from './pages/Courses';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TeachingSchedule />} />
        <Route path="/teaching-schedule" element={<TeachingSchedule />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/notifications" element={<ClassNotifications />} />
        <Route path="/courses" element={<Courses />} />
      </Routes>
    </Router>
  );
}

export default App;