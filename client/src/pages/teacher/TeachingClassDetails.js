import StudentList from "../teacher/StudentList";
import Grades from "../teacher/Grades";
import { useState } from "react";
import { ClipboardPenLine, UsersRound } from "lucide-react";

const TeachingClassDetails = () => {
  const [activeTab, setActiveTab] = useState("students"); // State to track active tab

  const classData =
  {
    "name": "A",
    "course": "course_001",
    "startDate": "2025-05-01",
    "status": "ongoing",
    "teacher": [
      {
        "name": "Sarah Johnson",
        "email": "sarah.johnson@example.com"
      },
      {
        "name": "Michael Brown",
        "email": "michael.brown@example.com"
      }
    ],
    "students": [
      {
        "studentId": "u4",
        "name": "John Doe",
        "email": "john.doe@example.com",
        "phone": "123-456-7890",
        "birthdate": "2000-01-01"
      },
      {
        "studentId": "u5",
        "name": "Jane Smith",
        "email": "jane.smith@example.com",
        "phone": "987-654-3210",
        "birthdate": "2001-02-02"
      },
      {
        "studentId": "u6",
        "name": "Alice Johnson",
        "email": "alice.johnson@example.com",
        "phone": "555-123-4567",
        "birthdate": "2002-03-03"
      },
      {
        "studentId": "u7",
        "name": "David Wilson",
        "email": "david.wilson@example.com",
        "phone": "444-555-6666",
        "birthdate": "2003-04-04"
      },
      {
        "studentId": "u8",
        "name": "Emily Davis",
        "email": "emily.davis@example.com",
        "phone": "333-444-5555",
        "birthdate": "2004-05-05"
      },
      {
        "studentId": "u9",
        "name": "Chris Evans",
        "email": "chris.evans@example.com",
        "phone": "222-333-4444",
        "birthdate": "2005-06-06"
      },
      {
        "studentId": "u10",
        "name": "Daniel Lee",
        "email": "daniel.lee@example.com",
        "phone": "111-222-3333",
        "birthdate": "2006-07-07"
      }
    ]
  };

  const grades = [
    {
      "studentId": "u4",
      "name": "John Doe",
      "score": {
        "listening": 7.0,
        "reading": 6.5,
        "writing": 6.0,
        "speaking": 7.0
      },
    },
    {
      "studentId": "u5",
      "name": "Jane Smith",
      "score": {
        "listening": 8.0,
        "reading": 7.5,
        "writing": 7.0,
        "speaking": 8.0
      }
    },
    {
      "studentId": "u5",
      "name": "Jane Smith",
      "score": {
        "listening": 8.0,
        "reading": 7.5,
        "writing": 7.0,
        "speaking": 8.0
      }
    },
    {
      "studentId": "u6",
      "name": "Alice Johnson",
      "score": {
        "listening": 9.0,
        "reading": 8.5,
        "writing": 8.0,
        "speaking": 9.0
      }
    },
    {
      "studentId": "u7",
      "name": "David Wilson",
      "score": {
        "listening": 7.5,
        "reading": 7.0,
        "writing": 6.5,
        "speaking": 7.5
      }
    },
    {
      "studentId": "u8",
      "name": "Emily Davis",
      "score": {
        "listening": 8.0,
        "reading": 7.5,
        "writing": 7.0,
        "speaking": 8.0
      }
    },
    {
      "studentId": "u9",
      "name": "Chris Evans",
      "score": {
        "listening": 7.0,
        "reading": 6.5,
        "writing": 6.0,
        "speaking": 7.0
      }
    },
    {
      "studentId": "u10",
      "name": "Daniel Lee",
      "score": {
        "listening": 6.0,
        "reading": 5.5,
        "writing": 5.0,
        "speaking": 6.0
      }
    }
  ]

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Class Details</h1>

      <div className="bg-white shadow rounded p-4 mb-6">
        <p>
          <strong>Class:</strong> {classData?.name}
        </p>
        <p>
          <strong>Teacher:</strong> {classData?.teacher?.map((t) => (
            <div key={t.email} className="block">
              <span className="font-semibold text-gray-700 ml-4">{t.name + " "}</span>
              (<span>Email: {t.email}</span>)
            </div>
          ))}
        </p>
        <p>
          <strong>Start date:</strong> {classData?.startDate}
        </p>
        <p>
          <strong>Course:</strong> {classData?.course}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          <span className="text-green-600">{classData?.status}</span>
        </p>
      </div>
      {/* Tab Content */}
      <div className="flex mb-4">
        <button className={`flex ${activeTab === "students" ? "bg-blue-800 text-white" : "bg-gray-200 text-gray-900"} px-4 py-2 rounded mr-4`}>
          <UsersRound />
          <h2 className="text-xl font-semibold"
            onClick={() => setActiveTab("students")}> Students
          </h2>
        </button>
        <button className={`flex ${activeTab === "grades" ? "bg-blue-800 text-white" : "bg-gray-200 text-gray-900"} px-4 py-2 rounded mr-4`}>
          <ClipboardPenLine />
          <h2 className="text-xl font-semibold"
            onClick={() => setActiveTab("grades")}> Grades
          </h2>
        </button>
      </div>
      {activeTab === "students" && (
        <StudentList students={classData?.students} />
      )}

      {activeTab === "grades" && (
        <Grades grades={grades} />
      )}
    </div>
  );
};

export default TeachingClassDetails;
