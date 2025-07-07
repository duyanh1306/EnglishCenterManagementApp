import React, { useEffect, useState } from "react";
import { FaDownload } from "react-icons/fa";

const LearningMaterials = () => {
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    const mockMaterials = [
      {
        id: 1,
        name: "TOEIC Listening Practice 1",
        className: "TOEIC B1",
        date: "2025-06-20",
        link: "#",
      },
      {
        id: 2,
        name: "IELTS Speaking Sample",
        className: "IELTS Prep",
        date: "2025-06-22",
        link: "#",
      },
      {
        id: 3,
        name: "Homework Week 1",
        className: "Speaking Club",
        date: "2025-06-23",
        link: "#",
      },
    ];
    setMaterials(mockMaterials);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Learning Materials</h1>
      {materials.length === 0 ? (
        <div className="text-gray-500">No materials found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {materials.map((item) => (
            <div
              key={item.id}
              className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition"
            >
              <h2 className="font-semibold text-blue-700 mb-1">{item.name}</h2>
              <p className="text-sm text-gray-600 mb-1">
                Class: {item.className}
              </p>
              <p className="text-xs text-gray-400 mb-3">
                Uploaded: {item.date}
              </p>
              <a
                href={item.link}
                className="inline-flex items-center text-blue-600 text-sm hover:underline"
              >
                <FaDownload className="mr-1" /> Download
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LearningMaterials;
