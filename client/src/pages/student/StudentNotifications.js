import React, { useEffect, useState } from "react";
import { FaBell, FaTimes, FaInfoCircle } from "react-icons/fa";

const StudentNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Mock data
    const mockNotifications = [
      {
        id: 1,
        title: "Holiday Announcement",
        message: "School holiday on 1st May.",
        time: "2025-05-30 08:00",
        isRead: false,
      },
      {
        id: 2,
        title: "Schedule Update",
        message: "Your English class schedule has been updated.",
        time: "2025-05-29 10:30",
        isRead: true,
      },
      {
        id: 3,
        title: "Tuition Reminder",
        message: "Please pay your tuition fee by 5/6.",
        time: "2025-05-28 14:45",
        isRead: false,
      },
    ];
    setNotifications(mockNotifications);
  }, []);

  const handleMarkAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const handleDelete = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const filteredNotifications = notifications.filter((notif) => {
    const matchesFilter =
      filter === "All" || (filter === "Unread" && !notif.isRead);

    const matchesSearch = notif.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Student Notifications</h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() =>
              setNotifications((prev) =>
                prev.map((notif) => ({ ...notif, isRead: true }))
              )
            }
            className="border px-3 py-1 rounded text-sm flex items-center gap-1 hover:bg-gray-100"
          >
            <FaInfoCircle /> Mark All Read
          </button>
          <div className="text-sm text-gray-500">{unreadCount} Unread</div>
        </div>
      </div>

      {/* Filter buttons */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {["All", "Unread"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`border px-3 py-1 rounded text-sm ${
              filter === type ? "bg-blue-500 text-white" : "hover:bg-gray-100"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by title"
          className="border px-4 py-2 rounded w-full md:w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Notifications */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="text-gray-500">No notifications found.</div>
        ) : (
          filteredNotifications.map((notif) => (
            <div
              key={notif.id}
              className={`flex justify-between items-start p-4 border rounded shadow-sm ${
                notif.isRead
                  ? "bg-white border-gray-200"
                  : "bg-blue-50 border-blue-200"
              }`}
            >
              <div className="flex items-start gap-3">
                <FaBell className="text-xl mt-1 text-blue-600" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{notif.title}</span>
                    {!notif.isRead && (
                      <span className="w-2 h-2 bg-blue-500 rounded-full inline-block"></span>
                    )}
                  </div>
                  <p className="text-sm text-gray-700 mt-1">{notif.message}</p>
                  <div className="text-xs text-gray-500 mt-1">{notif.time}</div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                {!notif.isRead && (
                  <button
                    onClick={() => handleMarkAsRead(notif.id)}
                    className="text-blue-600 text-sm hover:underline"
                  >
                    Mark as read
                  </button>
                )}
                <button
                  onClick={() => handleDelete(notif.id)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StudentNotifications;
