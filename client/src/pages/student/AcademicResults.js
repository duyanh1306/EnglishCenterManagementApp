// pages/AcademicResults.js
import React, { useEffect, useState } from "react";

const AcademicResults = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Mock detailed subject-based results
    const mockResults = [
      {
        subject: "English 101",
        scores: {
          Listening: 85,
          Speaking: 78,
          Reading: 92,
          Writing: 88,
        },
      },
      {
        subject: "TOEIC Preparation",
        scores: {
          Listening: 90,
          Speaking: 82,
          Reading: 89,
          Writing: 87,
        },
      },
    ];
    setResults(mockResults);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Academic Results</h1>
      {results.map((result, index) => (
        <div
          key={index}
          className="mb-6 border border-gray-300 rounded shadow bg-white p-4"
        >
          <h2 className="text-xl font-semibold mb-2 text-blue-700">
            {result.subject}
          </h2>
          <table className="w-full border-collapse border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Skill
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Score
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(result.scores).map(([skill, score]) => (
                <tr key={skill} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{skill}</td>
                  <td className="border border-gray-300 px-4 py-2">{score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default AcademicResults;
