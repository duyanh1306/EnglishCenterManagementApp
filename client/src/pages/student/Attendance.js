import React, { useEffect, useState } from "react";

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [filterMonth, setFilterMonth] = useState("2025-06"); // YYYY-MM format

  useEffect(() => {
    // Fake data: sau này có thể fetch từ API
    const mockData = [
      { date: "2025-06-01", status: "Present", note: "" },
      { date: "2025-06-02", status: "Absent", note: "Sick leave" },
      { date: "2025-06-03", status: "Present", note: "" },
      { date: "2025-06-04", status: "Late", note: "Traffic jam" },
      { date: "2025-06-05", status: "Present", note: "" },
      { date: "2025-06-06", status: "Absent", note: "Family issue" },
      { date: "2025-06-07", status: "Present", note: "" },
      { date: "2025-06-08", status: "Present", note: "" },
      { date: "2025-06-09", status: "Late", note: "" },
      { date: "2025-06-10", status: "Present", note: "" },
    ];

    setAttendanceData(mockData);
  }, []);

  const statusBadge = (status) => {
    const base = "px-2 py-0.5 rounded text-xs font-medium";
    if (status === "Present") return `${base} bg-green-100 text-green-700`;
    if (status === "Absent") return `${base} bg-red-100 text-red-700`;
    if (status === "Late") return `${base} bg-yellow-100 text-yellow-700`;
    return base;
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Attendance</h1>

      {/* Filter Month */}
      <div className="mb-4 flex items-center gap-3 flex-wrap">
        <label className="text-gray-700 font-medium">Filter by Month:</label>
        <input
          type="month"
          className="border px-3 py-2 rounded"
          value={filterMonth}
          onChange={(e) => setFilterMonth(e.target.value)}
        />
      </div>

      {/* Attendance Table */}
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
                  No attendance records found.
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

export default Attendance;
