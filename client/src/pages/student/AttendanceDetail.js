// src/pages/student/AttendanceDetail.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AttendanceDetail = () => {
  const { classId } = useParams();
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    // Dữ liệu điểm danh giả theo lớp
    const fakeData = {
      c1: [
        { date: "2025-06-01", status: "Present", note: "" },
        { date: "2025-06-02", status: "Absent", note: "Sick leave" },
        { date: "2025-06-03", status: "Late", note: "Traffic jam" },
      ],
      c2: [
        { date: "2025-06-05", status: "Present", note: "" },
        { date: "2025-06-06", status: "Absent", note: "Family issue" },
        { date: "2025-06-07", status: "Present", note: "" },
      ],
    };

    setAttendanceData(fakeData[classId] || []);
  }, [classId]);

  const statusBadge = (status) => {
    const base = "px-2 py-0.5 rounded text-xs font-medium";
    if (status === "Present") return `${base} bg-green-100 text-green-700`;
    if (status === "Absent") return `${base} bg-red-100 text-red-700`;
    if (status === "Late") return `${base} bg-yellow-100 text-yellow-700`;
    return base;
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-blue-800">
        Attendance Detail - Class {classId}
      </h1>

      <div className="overflow-x-auto border rounded shadow bg-white">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-3 text-left">Date</th>
              <th className="border px-4 py-3 text-left">Status</th>
              <th className="border px-4 py-3 text-left">Note</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center py-6 text-gray-500">
                  No attendance records for this class.
                </td>
              </tr>
            ) : (
              attendanceData.map((record, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="border px-4 py-2">{record.date}</td>
                  <td className="border px-4 py-2">
                    <span className={statusBadge(record.status)}>
                      {record.status}
                    </span>
                  </td>
                  <td className="border px-4 py-2 text-gray-700">
                    {record.note || "-"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceDetail;
