import { useNavigate } from "react-router-dom";

const ClassDetails = () => {
  const navigate = useNavigate();

  // Em có thể fetch dữ liệu từ API hoặc mock data trước
  const classData = {
    name: "English 101",
    teacher: "Mr. John Smith",
    schedule: "Mon - Wed, 13:00 - 14:30",
    room: "Room A1",
    status: "Ongoing",
    sessions: [
      {
        date: "2025-06-01",
        topic: "Unit 1: Introduction",
        attendance: "Present",
        note: "",
      },
      {
        date: "2025-06-03",
        topic: "Unit 2: Grammar",
        attendance: "Absent",
        note: "Sick leave",
      },
    ],
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Class Details</h1>

      <div className="bg-white shadow rounded p-4 mb-6">
        <p>
          <strong>Class:</strong> {classData.name}
        </p>
        <p>
          <strong>Teacher:</strong> {classData.teacher}
        </p>
        <p>
          <strong>Schedule:</strong> {classData.schedule}
        </p>
        <p>
          <strong>Room:</strong> {classData.room}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          <span className="text-green-600">{classData.status}</span>
        </p>
      </div>

      <h2 className="text-xl font-semibold mb-2">Sessions</h2>
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-2 text-left">Date</th>
            <th className="border px-3 py-2 text-left">Topic</th>
            <th className="border px-3 py-2 text-left">Attendance</th>
            <th className="border px-3 py-2 text-left">Note</th>
          </tr>
        </thead>
        <tbody>
          {classData.sessions.map((session, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="border px-3 py-2">{session.date}</td>
              <td className="border px-3 py-2">{session.topic}</td>
              <td className="border px-3 py-2">{session.attendance}</td>
              <td className="border px-3 py-2">{session.note}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={() => navigate("/student/my-classes")}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Back to My Classes
      </button>
    </div>
  );
};

export default ClassDetails;
