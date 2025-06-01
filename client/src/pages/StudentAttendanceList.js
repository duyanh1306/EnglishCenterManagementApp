import TeacherLayout from "../layouts/TeacherLayout";
import { useState, useEffect } from "react";
import { Search, Eye } from "lucide-react";
import { useLocation } from "react-router-dom";


// Example students data
const classes = [
    { id: 1, name: "A", room: "A101" },
    { id: 2, name: "B", room: "B202" },
    { id: 3, name: "C", room: "C303" }
];

const initialStudents = [
    { id: 1, studentId: "S001", name: "Alice Nguyen", email: "alice.nguyen@email.com", classId: 1, status: "active" },
    { id: 2, studentId: "S002", name: "Bob Tran", email: "bob.tran@email.com", classId: 2, status: "active" },
    { id: 3, studentId: "S003", name: "Linh Pham", email: "linh.pham@email.com", classId: 3, status: "inactive" },
    { id: 4, studentId: "S004", name: "David Lee", email: "david.lee@email.com", classId: 1, status: "active" },
];

// Helper to get query params
function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function StudentAttendanceList() {
    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState("");
    const query = useQuery();
    const classId = query.get("classId");

    useEffect(() => {
        const result = initialStudents.filter(s => {
            // Check classId filter
            const matchesClass = classId ? s.classId === parseInt(classId) : true;
            // If search is empty, use only class filter
            if (search.trim() === "") {
                return matchesClass;
            }
            const searchText = search.toLowerCase();
            const matchesSearch =
                s.name.toLowerCase().includes(searchText) ||
                s.email.toLowerCase().includes(searchText);
            return matchesClass && matchesSearch;
        });
        setStudents(result);
    }, [classId, search]);

    return (
        <TeacherLayout>
            <div className="w-full p-8 bg-gray-50 min-h-screen">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        {classId && (
                            <h2 className="text-2xl font-bold text-gray-900">
                                Taking Attendance, Class {classes.find(c => c.id === parseInt(classId))?.name || "Unknown"}
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
                                    placeholder="Search by name, email, or class..."
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
                                <th className="py-3 px-4">Action</th>
                                <th className="py-3 px-4">Attendance</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-800">
                            {students.filter(student => !classId || student.classId === parseInt(classId))
                                .map(student => (
                                    <tr key={student.id} className="border-b last:border-none">
                                        <td className="py-4 px-4 font-medium">{student.studentId}</td>
                                        <td className="py-4 px-4 font-medium">{student.name}</td>
                                        <td className="py-4 px-4">{student.email}</td>
                                        <td className="py-4 px-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold`}>
                                                <Eye className="inline-block ml-1 w-6 h-6 cursor-pointer text-gray-800 hover:text-gray-600" />
                                            </span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-2">
                                                <label className="inline-flex items-center">
                                                    <input
                                                        type="radio"
                                                        name={`attendance-${student.id}`}
                                                        value="absent"
                                                        defaultChecked
                                                        className="form-radio text-blue-600"
                                                    />
                                                    <span className="ml-1 text-sm">Absent</span>
                                                </label>
                                                <label className="inline-flex items-center">
                                                    <input
                                                        type="radio"
                                                        name={`attendance-${student.id}`}
                                                        value="attend"
                                                        className="form-radio text-blue-600"
                                                    />
                                                    <span className="ml-1 text-sm">Attend</span>
                                                </label>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            {students.filter(student => !classId || student.classId === parseInt(classId)).length === 0 && (
                                <tr>
                                    <td colSpan={5} className="py-8 text-center text-gray-400">
                                        No students found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </TeacherLayout>
    );
}