import React, { useState, useEffect } from "react";

const RegisterClass = () => {
  const [classes, setClasses] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Temporary sample data since API is not available
    const sampleClasses = [
      {
        id: 1,
        name: "English for Beginners",
        teacher: "Mr. Smith",
        room: "101",
        time: "Mon-Wed-Fri 8:00-10:00 AM",
      },
      {
        id: 2,
        name: "Intermediate Grammar",
        teacher: "Ms. Johnson",
        room: "202",
        time: "Tue-Thu 1:00-3:00 PM",
      },
      {
        id: 3,
        name: "TOEIC Preparation",
        teacher: "Mr. Lee",
        room: "303",
        time: "Sat-Sun 9:00-11:00 AM",
      },
    ];
    setClasses(sampleClasses);
  }, []);

  const handleRegister = (classId) => {
    alert(`Successfully registered for class ID: ${classId}`);
  };

  const filtered = classes.filter((cls) =>
    cls.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Register for Classes</h1>
      <input
        type="text"
        placeholder="Search classes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded w-full md:w-1/2"
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((cls) => (
          <div
            key={cls.id}
            className="border rounded shadow p-4 bg-white hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-2">{cls.name}</h2>
            <p className="text-gray-700 mb-1">Teacher: {cls.teacher}</p>
            <p className="text-gray-700 mb-1">Room: {cls.room}</p>
            <p className="text-gray-700 mb-1">Time: {cls.time}</p>
            <button
              onClick={() => handleRegister(cls.id)}
              className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Register
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegisterClass;
