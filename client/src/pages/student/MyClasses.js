import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const MyClasses = () => {
  const [classes, setClasses] = useState([]);
  const [filter, setFilter] = useState("Ongoing");

  useEffect(() => {
    // Mock data
    const mockClasses = [
      {
        id: 1,
        name: "TOEIC B1",
        teacher: "Mr. John",
        schedule: "Mon, Wed (18:00 - 19:30)",
        totalSessions: 20,
        completedSessions: 8,
        status: "Ongoing",
      },
      {
        id: 2,
        name: "Speaking Club",
        teacher: "Ms. Anna",
        schedule: "Sat (15:00 - 17:00)",
        totalSessions: 10,
        completedSessions: 4,
        status: "Ongoing",
      },
      {
        id: 3,
        name: "IELTS Prep",
        teacher: "Mr. Lee",
        schedule: "Tue, Thu (19:00 - 20:30)",
        totalSessions: 20,
        completedSessions: 20,
        status: "Completed",
      },
    ];
    setClasses(mockClasses);
  }, []);

  const filteredClasses = classes.filter(
    (cls) => filter === "All" || cls.status === filter
  );

  return (
    <div className="p-6">
      {/* Title + Filter */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h1 className="text-2xl font-bold">My Classes</h1>

        <div className="flex gap-2 flex-wrap">
          {["All", "Ongoing", "Completed"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`border px-4 py-1.5 rounded text-sm font-medium transition-all ${
                filter === type
                  ? "bg-blue-500 text-white shadow"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      {filteredClasses.length === 0 ? (
        <div className="text-gray-500 text-center py-10">No classes found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-3 text-left">Class Name</th>
                <th className="border px-4 py-3 text-left">Teacher</th>
                <th className="border px-4 py-3 text-left">Schedule</th>
                <th className="border px-4 py-3 text-left">Progress</th>
                <th className="border px-4 py-3 text-center">Status</th>
                <th className="border px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredClasses.map((cls) => {
                const progressPercent = Math.round(
                  (cls.completedSessions / cls.totalSessions) * 100
                );

                return (
                  <tr
                    key={cls.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="border px-4 py-3 font-semibold text-blue-700">
                      {cls.name}
                    </td>
                    <td className="border px-4 py-3">{cls.teacher}</td>
                    <td className="border px-4 py-3">{cls.schedule}</td>
                    <td className="border px-4 py-3">
                      <div className="w-full bg-gray-200 rounded h-2 mb-1">
                        <div
                          className="bg-blue-500 h-2 rounded transition-all duration-500"
                          style={{ width: `${progressPercent}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500">
                        {cls.completedSessions}/{cls.totalSessions} sessions (
                        {progressPercent}%)
                      </div>
                    </td>
                    <td className="border px-4 py-3 text-center">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          cls.status === "Ongoing"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {cls.status}
                      </span>
                    </td>
                    <td className="border px-4 py-3 text-center">
                      <Link
                        to={`/student/my-classes/${cls.id}`}
                        className="text-blue-600 hover:underline text-sm"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyClasses;
