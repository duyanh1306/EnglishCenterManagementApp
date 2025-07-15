import React, { useState, useEffect } from "react";
import axios from "axios";

const RegisterClass = () => {
  const [classes, setClasses] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const studentId = "687139a34cdde4e0be2848fc"; 

    const fetchClasses = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9999/api/student/${studentId}/registerable-classes`
        );
        setClasses(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching classes:", err);
        setError("Failed to load classes.");
        setLoading(false);
      }
    };
    fetchClasses();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-800">
        Register for Classes
      </h1>
      <input
        type="text"
        placeholder="Search classes by name or course..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded w-full md:w-1/2"
      />
      {/* Display loading state */}
      {loading && <p className="text-gray-500">Loading classes...</p>}
      {/* Display error message if any */}
      {error && <p className="text-red-500">{error}</p>}
      {/* Display fetched classes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {(Array.isArray(classes) ? classes : [])
          .filter(
            (cls) =>
              (cls.name?.toLowerCase() || "").includes(search.toLowerCase()) ||
              (cls.courseName?.toLowerCase() || "").includes(
                search.toLowerCase()
              )
          )
          .map((cls) => (
            <div
              key={cls._id}
              className="p-4 border rounded shadow hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold">{cls.name}</h2>
              <p>
                <strong>Course:</strong> {cls.courseName}
              </p>
              <p>
                <strong>Teachers:</strong> {cls.teachers}
              </p>
              <p>
                <strong>Schedule:</strong>{" "}
                {Array.isArray(cls.schedule) && cls.schedule.length > 0 ? (
                  <ul className="list-disc list-inside">
                    {cls.schedule.map((s, idx) => (
                      <li key={idx}>
                        {s.weekday}: {s.from} - {s.to}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span>No schedule</span>
                )}
              </p>
              <p>
                <strong>Capacity:</strong> {cls.capacity} (Registered Students:{" "}
                {cls.studentsCount})
              </p>
              <p>
                <strong>Status:</strong> {cls.status}
              </p>
              {cls.registered ? (
                <button
                  className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  type="button"
                  onClick={() => alert(`you are registered for this class`)}
                >
                  Enrolled
                </button>
              ) : (
                <button
                  className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={() => alert(`Enrolled in ${cls.name}`)}
                >
                  Enroll
                </button>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default RegisterClass;
