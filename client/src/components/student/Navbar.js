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
  "/student/notifications": "Notifications",
  "/student/feedback": "Feedback",
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
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative text-gray-600 hover:text-blue-600 text-xl focus:outline-none"
          >
            <FaBell />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded shadow-lg z-10">
              <div className="p-3 font-semibold border-b text-gray-700">
                Notifications
              </div>
              {notifications.length === 0 ? (
                <div className="p-4 text-gray-500 text-sm text-center">
                  No notifications
                </div>
              ) : (
                <>
                  <ul className="max-h-60 overflow-y-auto">
                    {notifications.map((notif) => (
                      <li
                        key={notif.id}
                        className="p-3 hover:bg-gray-100 border-b text-sm"
                      >
                        <div>{notif.message}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {notif.time}
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="p-2 text-center border-t bg-gray-50">
                    <Link
                      to="/student/notifications"
                      className="text-blue-600 text-sm hover:underline"
                      onClick={() => setShowNotifications(false)}
                    >
                      View All Notifications
                    </Link>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

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
