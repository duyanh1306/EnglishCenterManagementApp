import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useLocation } from "react-router-dom";

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
  "/student/class-details": "Class Details",
  "/student/attendance-list": "Attendance List",
  "/student/grades": "Grades",
  "/student/dashboard": "Student Dashboard",
};

const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const pageTitle = pageTitles[currentPath] || "Student Portal";

  const [user, setUser] = useState({ name: "John Doe" });

  return (
    <nav className="bg-white shadow px-6 py-3 flex justify-between items-center relative">
      {/* Page title */}
      <div className="text-gray-600 text-base font-semibold">{pageTitle}</div>

      <div className="flex items-center gap-6">
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
