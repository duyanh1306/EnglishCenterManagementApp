// src/pages/student/AttendanceList.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AttendanceList = () => {
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Dữ liệu giả: các lớp học của học viên
    const mockClassList = [
      { classId: "c1", className: "TOEIC A", totalSessions: 20, attended: 18 },
      {
        classId: "c2",
        className: "IELTS Prep",
        totalSessions: 15,
        attended: 13,
      },
    ];
    setClasses(mockClassList);
  }, []);

  const handleView = (classId) => {
    navigate(`/student/attendance/${classId}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-blue-800">My Attendance</h1>
      <div className="bg-white border rounded shadow p-4">
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Class</th>
              <th className="p-2 border">Total Sessions</th>
              <th className="p-2 border">Attended</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((cls) => (
              <tr key={cls.classId} className="hover:bg-gray-50">
                <td className="p-2 border">{cls.className}</td>
                <td className="p-2 border">{cls.totalSessions}</td>
                <td className="p-2 border text-green-600 font-semibold">
                  {cls.attended}
                </td>
                <td className="p-2 border">
                  <button
                    onClick={() => handleView(cls.classId)}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
            {classes.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-500">
                  No attendance data.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceList;
