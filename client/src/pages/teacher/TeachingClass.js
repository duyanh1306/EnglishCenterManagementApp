import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NotebookTabs } from "lucide-react";

export default function TeachingClass() {
  const [classes, setClasses] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    // Mock data
    const mockClasses = [
      {
        "id": "c1",
        "name": "A",
        "course": "TOEIC",
        "startDate": "2025-05-01",
        "status": "On going"
      },
      {
        "id": "c2",
        "name": "B",
        "course": "IELTS",
        "startDate": "2025-06-01",
        "status": "Completed"
      },
      {
        "id": "c3",
        "name": "C",
        "course": "TOEFL",
        "startDate": "2025-07-01",
        "status": "On going"
      }
    ];
    if(statusFilter !== "All") {
      setClasses(mockClasses.filter(cls => cls.status.toLowerCase() === statusFilter.toLowerCase()));
    } else {
      setClasses(mockClasses);
    }
  }, [statusFilter]);



  return (
    <div className="p-6">
      {/* Title + Filter */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h1 className="text-2xl font-bold">Teaching Classes</h1>

        <div className="flex gap-2 flex-wrap">
          {["All", "On going", "Completed"].map((type) => (
            <button
              key={type}
              onClick={() => setStatusFilter(type)}
              className={`border px-4 py-1.5 rounded text-sm font-medium transition-all ${statusFilter.toLowerCase() === type.toLowerCase()
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
      {classes.length === 0 ? (
        <div className="text-gray-500 text-center py-10">No classes found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-3 text-center">Class Name</th>
                <th className="border px-4 py-3 text-center">Course</th>
                <th className="border px-4 py-3 text-center">Start Date</th>
                <th className="border px-4 py-3 text-center">Status</th>
                <th className="border px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((cls) => {

                return (
                  <tr
                    key={cls.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="border px-4 py-3 font-semibold text-center text-blue-700">
                      {cls.name}
                    </td>
                    <td className="border px-4 py-3 text-center">{cls.course}</td>
                    <td className="border px-4 py-3 text-center">{cls.startDate}</td>
                    <td className="border px-4 py-3 text-center">
                      <span
                        className={`px-2 py-1 rounded font-medium ${cls.status === "On going"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-600"
                          }`}
                      >
                        {cls.status}
                      </span>
                    </td>
                    <td className="border px-4 py-3 text-center max-w-[80px]">
                      <Link
                        to={`/teacher/classes/${cls.id}`}
                        className="flex justify-center text-blue-600 hover:underline text-sm"
                      >
                        <NotebookTabs size={20} /> View Details
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