// src/pages/student/AttendanceDetail.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AttendanceDetail = () => {
  const { classId } = useParams();
  const studentId = "u4";

  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    // Sample collections from MongoDB-like structure
    const scheduleList = [
      {
        id: "1",
        slotId: "1",
        classId: "c1",
        roomId: "1",
        date: "2025-05-25",
      },
      {
        id: "2",
        slotId: "2",
        classId: "c1",
        roomId: "2",
        date: "2025-05-27",
      },
      {
        id: "3",
        slotId: "1",
        classId: "c1",
        roomId: "1",
        date: "2025-06-01",
      },
    ];

    const classes = [
      {
        id: "c1",
        name: "A",
        courseId: "course_001",
        startDate: "2025-05-01",
        status: "ongoing",
        teacherId: [{ teacherId: "u2" }],
        students: [
          { studentId: "u4" },
          { studentId: "u5" },
          { studentId: "u6" },
          { studentId: "u7" },
          { studentId: "u8" },
        ],
      },
    ];

    const attendanceList = [
      { _id: "1", studentId: "u4", scheduleId: "1", status: "present" },
      { _id: "2", studentId: "u5", scheduleId: "1", status: "absent" },
      { _id: "3", studentId: "u4", scheduleId: "2", status: "absent" },
      { _id: "4", studentId: "u4", scheduleId: "3", status: "present" },
    ];

    const matchedAttendance = attendanceList.filter(
      (record) => record.studentId === studentId
    );

    const fullRecords = matchedAttendance.map((att) => {
      const schedule = scheduleList.find((s) => s.id === att.scheduleId);
      const classInfo = classes.find((c) => c.id === schedule.classId);

      const dateObj = new Date(schedule.date);
      const dayName = dateObj.toLocaleDateString("en-US", { weekday: "long" });

      return {
        date: schedule.date,
        day: dayName,
        slot: `Slot ${schedule.slotId}`,
        room: `Room ${schedule.roomId}`,
        lecturer: classInfo.teacherId[0].teacherId,
        className: classInfo.name,
        status: att.status.charAt(0).toUpperCase() + att.status.slice(1),
      };
    });

    setAttendanceData(fullRecords);
  }, [classId]);

  const statusBadge = (status) => {
    const base = "px-2 py-0.5 rounded text-xs font-medium";
    if (status === "Present") return `${base} bg-green-100 text-green-700`;
    if (status === "Absent") return `${base} bg-red-100 text-red-700`;
    if (status === "Future") return `${base} bg-gray-100 text-gray-500`;
    return base;
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-6 text-blue-800">View attendance</h1>

      <div className="overflow-x-auto border rounded shadow bg-white">
        <table className="min-w-full border-collapse text-sm">
          <thead className="bg-blue-100 text-blue-800">
            <tr>
              <th className="border px-3 py-2">No.</th>
              <th className="border px-3 py-2">Date</th>
              <th className="border px-3 py-2">Day</th>
              <th className="border px-3 py-2">Slot</th>
              <th className="border px-3 py-2">Room</th>
              <th className="border px-3 py-2">Lecturer</th>
              <th className="border px-3 py-2">Class</th>
              <th className="border px-3 py-2">Attendance</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-6 text-gray-500">
                  No attendance records found.
                </td>
              </tr>
            ) : (
              attendanceData.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="border px-3 py-2 text-center">{index + 1}</td>
                  <td className="border px-3 py-2">{item.date}</td>
                  <td className="border px-3 py-2">{item.day}</td>
                  <td className="border px-3 py-2">{item.slot}</td>
                  <td className="border px-3 py-2">{item.room}</td>
                  <td className="border px-3 py-2">{item.lecturer}</td>
                  <td className="border px-3 py-2">{item.className}</td>
                  <td className="border px-3 py-2 text-center">
                    <span className={statusBadge(item.status)}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {attendanceData.length > 0 && (
        <div className="mt-4 text-sm text-gray-600">
          <strong className="text-red-600">Absent:</strong>{" "}
          {Math.round(
            (attendanceData.filter((d) => d.status === "Absent").length /
              attendanceData.length) *
              100
          )}
          % ABSENT SO FAR (
          {attendanceData.filter((d) => d.status === "Absent").length} ABSENT ON{" "}
          {attendanceData.length} TOTAL).
        </div>
      )}
    </div>
  );
};

export default AttendanceDetail;
