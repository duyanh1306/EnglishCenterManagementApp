import React from "react";

const resultsData = [
  {
    subject: "Math",
    score: 95,
    grade: "A",
    semester: "Spring 2025",
    remarks: "Excellent performance",
  },
  {
    subject: "Physics",
    score: 88,
    grade: "B+",
    semester: "Spring 2025",
    remarks: "Good understanding",
  },
  {
    subject: "Chemistry",
    score: 92,
    grade: "A-",
    semester: "Spring 2025",
    remarks: "Strong effort and participation",
  },
  {
    subject: "English",
    score: 90,
    grade: "A",
    semester: "Spring 2025",
    remarks: "Consistent work",
  },
];

const AcademicResults = () => {
  return (
    <div className="flex justify-center items-center w-full p-6">
      <div className="bg-white rounded-xl shadow p-6 overflow-x-auto w-[98%] max-w-[1000px]">
        <h2 className="text-xl font-bold mb-4 text-center">Academic Results</h2>
        <table className="table w-full border border-gray-200 min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Subject</th>
              <th className="border p-2">Score</th>
              <th className="border p-2">Grade</th>
              <th className="border p-2">Semester</th>
              <th className="border p-2">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {resultsData.map((result, index) => (
              <tr key={index} className="text-sm">
                <td className="border p-2 text-center">{result.subject}</td>
                <td className="border p-2 text-center">{result.score}</td>
                <td className="border p-2 text-center">{result.grade}</td>
                <td className="border p-2 text-center">{result.semester}</td>
                <td className="border p-2 text-center">{result.remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AcademicResults;
