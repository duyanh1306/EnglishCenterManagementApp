// src/pages/student/GradeDetails.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const GradeDetails = () => {
  const { classId } = useParams();
  const [gradeDetails, setGradeDetails] = useState(null);

  useEffect(() => {
    // Mock API response theo classId
    const mockDetails = {
      c1: {
        className: "TOEIC B1",
        skills: [
          { name: "Listening", score: 8.5, comment: "Good" },
          { name: "Speaking", score: 7.5, comment: "Improve pronunciation" },
          { name: "Reading", score: 9.0, comment: "Excellent" },
          { name: "Writing", score: 8.2, comment: "" },
        ],
      },
      c2: {
        className: "IELTS Prep",
        skills: [
          { name: "Listening", score: 8.0, comment: "Solid effort" },
          { name: "Speaking", score: 8.5, comment: "Very clear" },
          { name: "Reading", score: 8.9, comment: "" },
          { name: "Writing", score: 8.8, comment: "Well-structured" },
        ],
      },
    };

    setGradeDetails(mockDetails[classId] || null);
  }, [classId]);

  if (!gradeDetails) {
    return <div className="p-6 text-gray-600">No grade details found.</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-800">
        Grade Details - {gradeDetails.className}
      </h1>

      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Skill</th>
            <th className="border p-2">Score</th>
            <th className="border p-2">Comment</th>
          </tr>
        </thead>
        <tbody>
          {gradeDetails.skills.map((skill, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="border p-2">{skill.name}</td>
              <td className="border p-2">{skill.score}</td>
              <td className="border p-2 italic">
                {skill.comment || "No comment"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GradeDetails;
