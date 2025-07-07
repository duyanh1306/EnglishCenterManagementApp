import { useState, useEffect } from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { useLocation, Link } from "react-router-dom";

// Map đường dẫn thành tiêu đề
const pageTitles = {
  "/dashboard": "Home",
  "/student/schedule": "Schedule",
  "/student/register-class": "Register Class",
  "/student/results": "Academic Results",
  "/student/attendance": "Attendance",
  "/student/profile": "Profile",
  "/student/exam-schedule": "Exam Schedule",
  "/student/grade": "Grade",

  "/student/my-classes": "My Classes",
};

const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const pageTitle = pageTitles[currentPath] || "Student Portal";

  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [user, setUser] = useState({ name: "John Doe" }); // sau này có thể lấy từ context, localStorage...

  // Fake notifications API
  useEffect(() => {
    const mockNotifications = [
      {
        id: 1,
        message: "Your assignment deadline is tomorrow.",
        time: "2 hrs ago",
      },
      { id: 2, message: "New message from Teacher John.", time: "5 hrs ago" },
      {
        id: 3,
        message: "Your class schedule has been updated.",
        time: "1 day ago",
      },
    ];
    setNotifications(mockNotifications);
  }, []);

  const unreadCount = notifications.length;

  return (
    <nav className="bg-white shadow px-6 py-3 flex justify-between items-center relative">
      {/* Page title */}
      <div className="text-gray-600 text-base font-semibold">{pageTitle}</div>

      <div className="flex items-center gap-6">
        {/* Notifications */}

        {/* User */}
        <div className="flex items-center gap-2 text-gray-700 font-medium">
          <FaUserCircle className="text-2xl" />
          <span>{user.name}</span>
        </div>

        {/* Logout */}
        <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
