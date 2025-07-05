import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaCalendarAlt,
  FaClipboardList,
  FaGraduationCap,
  FaUser,
  FaBell,
  FaBookOpen,
  FaComments,
  FaClipboardCheck,
} from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Home", icon: <FaHome />, path: "/dashboard" },
    { name: "My Classes", icon: <FaBookOpen />, path: "/student/my-classes" },
    { name: "Schedule", icon: <FaCalendarAlt />, path: "/student/schedule" },
    {
      name: "Register Class",
      icon: <FaClipboardList />,
      path: "/student/register-class",
    },
    {
      name: "Academic Results",
      icon: <FaGraduationCap />,
      path: "/student/results",
    },
    {
      name: "Attendance",
      icon: <FaClipboardCheck />,
      path: "/student/attendance",
    },

    // { name: "Notifications", icon: <FaBell />, path: "/student/notifications" },
    { name: "Feedback", icon: <FaComments />, path: "/student/feedback" },
  ];

  return (
    <div
      className={`bg-blue-800 text-white h-screen p-4 ${
        isOpen ? "w-60" : "w-16"
      } transition-all duration-300 md:w-60`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mb-4 text-white text-xl md:hidden"
      >
        {isOpen ? "✖" : "☰"}
      </button>

      <ul>
        {menuItems.map((item) => (
          <li key={item.path} className="mb-2">
            <Link
              to={item.path}
              className="flex items-center p-2 hover:bg-blue-600 rounded transition-colors"
            >
              <span className="text-xl mr-3">{item.icon}</span>
              <span className={`${isOpen ? "block" : "hidden"} md:block`}>
                {item.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
