import TeacherLayout from "../layouts/TeacherLayout";
import { useState, useEffect } from "react";
import { Search, Edit } from "lucide-react";
import { useLocation } from "react-router-dom";
import AttendanceService from "../services/AttendanceService";

// Helper to get query params
function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function StudentAttendanceList() {
    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState("");
    const query = useQuery();
    const classId = query.get("classId");
    const date = query.get("date");
    const className = query.get("className") || "Class";
    const [editingStudentId, setEditingStudentId] = useState(null); // Track which student is being edited

    const handleNoteChange = (studentId, newNote) => {
        setStudents(prevStudents =>
            prevStudents.map(student =>
                student.id === studentId ? { ...student, note: newNote } : student
            )
        );
    };

    const handleSaveNote = () => {
        setEditingStudentId(null); // Exit editing mode
    };

    useEffect(() => {
        // Fetch attendance data using AttendanceService
        const fetchedStudents = classId ? AttendanceService.getAttendanceOfClass(classId) : [];
        const filteredStudents = fetchedStudents.filter(student => {
            if (search.trim() === "") {
                return true; // No search filter applied
            }
            const searchText = search.toLowerCase();
            return (
                student.fullName.toLowerCase().includes(searchText) ||
                student.email.toLowerCase().includes(searchText)
            );
        });
        setStudents(filteredStudents);
    }, [classId, search]);

    const handleAttendanceChange = (studentId, attendanceStatus) => {
        setStudents(prevStudents =>
            prevStudents.map(student =>
                student.id === studentId ? { ...student, attendance: attendanceStatus } : student
            )
        );
    };

    const handleSaveAttendance = () => {
        // Save updated attendance data (mock implementation)
        console.log("Updated Attendance:", students);
        alert("Attendance saved successfully!");
    };

    return (
        <TeacherLayout>
            <div className="w-full p-8 bg-gray-50 min-h-screen">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        {classId && (
                            <h2 className="text-2xl font-bold text-gray-900">
                                Taking Attendance, Class {className} on {new Date(date).toLocaleDateString()}
                            </h2>
                        )}
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow p-6 mb-6">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <div className="w-full md:w-1/3">
                            <label className="block text-sm font-medium mb-1">Search</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    <Search className="w-5 h-5" />
                                </span>
                                <input
                                    type="text"
                                    placeholder="Search by name or email..."
                                    className="border border-gray-300 rounded pl-10 pr-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-200"
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow p-4">
                    <table className="min-w-full">
                        <thead>
                            <tr className="text-left text-gray-600 border-b">
                                <th className="py-3 px-4">Student ID</th>
                                <th className="py-3 px-4">Name</th>
                                <th className="py-3 px-4">Email</th>
                                <th className="py-3 px-4">Note</th>
                                <th className="py-3 px-4">Attendance</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-800">
                            {students.map(student => (
                                <tr key={student.id} className="border-b last:border-none">
                                    <td className="py-4 px-4 font-medium">{student.id}</td>
                                    <td className="py-4 px-4 font-medium">{student.fullName}</td>
                                    <td className="py-4 px-4">{student.email}</td>
                                    <td className="py-4 px-4">
                                        {editingStudentId === student.id ? (
                                            <div className="flex items-center">
                                                <input
                                                    type="text"
                                                    value={student.note || ""}
                                                    onChange={e => handleNoteChange(student.id, e.target.value)}
                                                    className="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-200"
                                                />
                                                <button
                                                    className="ml-2 text-blue-600 hover:text-blue-800"
                                                    onClick={handleSaveNote}
                                                >
                                                    Save
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex items-center">
                                                <span>{student.note || "No notes"}</span>
                                                <Edit
                                                    className="inline w-4 h-4 ml-2 cursor-pointer text-gray-600 hover:text-gray-800"
                                                    onClick={() => setEditingStudentId(student.id)}
                                                />
                                            </div>
                                        )}
                                    </td>                                    <td className="py-4 px-4">
                                        <div className="flex items-center gap-2">
                                            <label className="inline-flex items-center">
                                                <input
                                                    type="radio"
                                                    name={`attendance-${student.id}`}
                                                    value="absent"
                                                    checked={!student.attendance}
                                                    onChange={() => handleAttendanceChange(student.id, false)}
                                                    className="form-radio text-blue-600"
                                                />
                                                <span className="ml-1 text-sm">Absent</span>
                                            </label>
                                            <label className="inline-flex items-center">
                                                <input
                                                    type="radio"
                                                    name={`attendance-${student.id}`}
                                                    value="attend"
                                                    checked={student.attendance}
                                                    onChange={() => handleAttendanceChange(student.id, true)}
                                                    className="form-radio text-blue-600"
                                                />
                                                <span className="ml-1 text-sm">Attend</span>
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {students.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="py-8 text-center text-gray-400">
                                        No students found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="mt-4 flex justify-end">
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                        onClick={handleSaveAttendance}
                    >
                        Save Attendance
                    </button>
                </div>
            </div>
        </TeacherLayout>
    );
}