import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function TeachingClass() {
  const [classes, setClasses] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    // Mock data
    const mockClasses = [
      {
        "id": "c1",
        "name": "A",
        "course": "TOEIC",
        "startDate": "2025-05-01",
        "status": "ongoing" 
      },
      {
        "id": "c2",
        "name": "B",
        "course": "IELTS",
        "startDate": "2025-06-01",
        "status": "completed"
      },
      {
        "id": "c3",
        "name": "C",
        "course": "TOEFL",
        "startDate": "2025-07-01",
        "status": "ongoing"
      }
    ];
    setClasses(mockClasses);
  }, []);

  const filteredClasses = classes.filter(
    (cls) => filter === "All" || cls.status.toLowerCase() === filter.toLowerCase()
  );

  return (
    <div className="p-6">
      {/* Title + Filter */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h1 className="text-2xl font-bold">My Classes</h1>

        <div className="flex gap-2 flex-wrap">
          {["All", "Ongoing", "Completed"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type.toLowerCase())}
              className={`border px-4 py-1.5 rounded text-sm font-medium transition-all ${filter.toLowerCase() === type.toLowerCase()
                ? "bg-blue-500 text-white shadow"
                : "hover:bg-gray-100 text-gray-700"
                }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      {filteredClasses.length === 0 ? (
        <div className="text-gray-500 text-center py-10">No classes found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-3 text-left">Class Name</th>
                <th className="border px-4 py-3 text-center">Course</th>
                <th className="border px-4 py-3 text-center">Start Date</th>
                <th className="border px-4 py-3 text-center">Status</th>
                <th className="border px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredClasses.map((cls) => {

                return (
                  <tr
                    key={cls.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="border px-4 py-3 font-semibold text-blue-700">
                      {cls.name}
                    </td>
                    <td className="border px-4 py-3 text-center">{cls.course}</td>
                    <td className="border px-4 py-3 text-center">{cls.startDate}</td>
                    <td className="border px-4 py-3 text-center">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${cls.status === "Ongoing"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-600"
                          }`}
                      >
                        {cls.status}
                      </span>
                    </td>
                    <td className="border px-4 py-3 text-center">
                      <Link
                        to={`/student/my-classes/${cls.id}`}
                        className="text-blue-600 hover:underline text-sm"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}