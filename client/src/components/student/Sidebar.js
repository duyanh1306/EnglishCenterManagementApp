import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Home", icon: "🏠", path: "/dashboard" },
    { name: "Schedule", icon: "📅", path: "/student/schedule" },
    { name: "Academic Results", icon: "📊", path: "/student/results" },
    { name: "Class Information", icon: "🎓", path: "/classes" },
    { name: "Register Class", icon: "📝", path: "/register-class" },
    { name: "Leave Request", icon: "📋", path: "/leave-request" },

    { name: "Notifications", icon: "🔔", path: "/notifications" },
    { name: "Feedback & Contact", icon: "✉️", path: "/feedback" },
  ];

  return (
    <div
      className={`bg-blue-800 text-white h-screen p-4 ${
        isOpen ? "w-60" : "w-16"
      } transition-all md:w-60`}
    >
      <button onClick={() => setIsOpen(!isOpen)} className="mb-4 md:hidden">
        {isOpen ? "✖" : "☰"}
      </button>
      <ul>
        {menuItems.map((item) => (
          <li key={item.path} className="mb-2">
            <Link
              to={item.path}
              className="flex items-center p-2 hover:bg-blue-600 rounded transition-colors"
            >
              <span className="text-xl mr-2">{item.icon}</span>
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
