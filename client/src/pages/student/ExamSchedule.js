import React, { useEffect, useState } from "react";

const ExamSchedule = () => {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    const mockExams = [
      {
        id: 1,
        name: "TOEIC B1 Midterm",
        date: "2025-07-10",
        time: "18:00 - 19:30",
        room: "Room A1",
        notes: "Bring student card",
      },
      {
        id: 2,
        name: "IELTS Final Exam",
        date: "2025-07-25",
        time: "15:00 - 17:00",
        room: "IELTS Lab",
        notes: "Prepare speaking part",
      },
    ];
    setExams(mockExams);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Exam Schedule</h1>
      {exams.length === 0 ? (
        <div className="text-gray-500">No exam schedule available.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2 text-left">Exam Name</th>
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Time</th>
                <th className="border px-4 py-2">Room</th>
                <th className="border px-4 py-2">Notes</th>
              </tr>
            </thead>
            <tbody>
              {exams.map((exam) => (
                <tr key={exam.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2 font-medium text-blue-700">
                    {exam.name}
                  </td>
                  <td className="border px-4 py-2">{exam.date}</td>
                  <td className="border px-4 py-2">{exam.time}</td>
                  <td className="border px-4 py-2">{exam.room}</td>
                  <td className="border px-4 py-2 text-sm text-gray-600">
                    {exam.notes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ExamSchedule;
