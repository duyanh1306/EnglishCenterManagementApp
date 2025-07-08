// src/pages/student/Grades.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Grades = () => {
  const [gradeList, setGradeList] = useState([]);
  const [classes, setClasses] = useState([]);
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const mockGrades = [
      {
        id: "1",
        studentId: "u4",
        classId: "c1",
        score: {
          listening: 8.5,
          reading: 7.0,
          writing: 6.5,
          speaking: 7.5,
        },
        comment: "Làm bài tốt, chú ý phần speaking.",
      },
      {
        id: "2",
        studentId: "u4",
        classId: "c2",
        score: {
          listening: 9.0,
          reading: 8.5,
          writing: 8.0,
          speaking: 8.5,
        },
        comment: "Rất tiến bộ.",
      },
      {
        id: "3",
        studentId: "u4",
        classId: "c3",
        score: {
          listening: 6.5,
          reading: 7.0,
          writing: 7.5,
          speaking: 7.0,
        },
        comment: "Nên cải thiện phần nghe.",
      },
      {
        id: "4",
        studentId: "u4",
        classId: "c4",
        score: {
          listening: 8.8,
          reading: 9.0,
          writing: 9.2,
          speaking: 8.7,
        },
        comment: "Excellent performance!",
      },
    ];

    const mockClasses = [
      {
        id: "c1",
        name: "Class A",
        courseId: "course_001",
      },
      {
        id: "c2",
        name: "Class B",
        courseId: "course_002",
      },
      {
        id: "c3",
        name: "Class C",
        courseId: "course_003",
      },
      {
        id: "c4",
        name: "Class D",
        courseId: "course_004",
      },
    ];

    const mockCourses = [
      { id: "course_001", name: "TOEIC B1" },
      { id: "course_002", name: "IELTS Speaking" },
      { id: "course_003", name: "IELTS Writing" },
      { id: "course_004", name: "Academic English" },
    ];

    setGradeList(mockGrades);
    setClasses(mockClasses);
    setCourses(mockCourses);
  }, []);

  const handleViewDetails = (classId) => {
    navigate(`/student/grade/${classId}`);
  };

  const getClassName = (classId) => {
    const cls = classes.find((c) => c.id === classId);
    return cls ? cls.name : classId;
  };

  const getCourseName = (classId) => {
    const cls = classes.find((c) => c.id === classId);
    const course = cls && courses.find((c) => c.id === cls.courseId);
    return course ? course.name : "Unknown";
  };

  const getAverageScore = (scoreObj) => {
    const values = Object.values(scoreObj);
    const total = values.reduce((sum, s) => sum + s, 0);
    return (total / values.length).toFixed(2);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-blue-800">My Grades</h1>
      <table className="w-full text-sm border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border text-left">Class</th>
            <th className="p-2 border text-left">Course</th>
            <th className="p-2 border text-left">Grades</th>
            <th className="p-2 border text-left">Comment</th>
            <th className="p-2 border text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {gradeList.map((grade) => (
            <tr key={grade.id} className="hover:bg-gray-50">
              <td className="p-2 border text-left">
                {getClassName(grade.classId)}
              </td>
              <td className="p-2 border text-left">
                {getCourseName(grade.classId)}
              </td>
              <td className="p-2 border text-left text-blue-600 font-semibold">
                {getAverageScore(grade.score)}
              </td>
              <td className="p-2 border text-left italic text-gray-600">
                {grade.comment || "-"}
              </td>
              <td className="p-2 border text-left">
                <button
                  onClick={() => handleViewDetails(grade.classId)}
                  className="text-blue-600 hover:underline text-sm"
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
          {gradeList.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center p-4 text-gray-500">
                No grades available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Grades;
