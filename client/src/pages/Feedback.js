import TeacherLayout from '../layouts/TeacherLayout';
import { useState } from 'react';
import { Star, Search } from 'lucide-react';

const classes = [
    { id: 1, name: "A", room: "A101" },
    { id: 2, name: "B", room: "B202" },
    { id: 3, name: "C", room: "C303" },
];

const initialFeedback = [
    {
        id: 1,
        student: "Alice Nguyen",
        course: "Business English Fundamentals",
        classId: 1,
        rating: 5,
        comment: "Great course! The teacher explained everything clearly.",
        date: "2024-05-20",
    },
    {
        id: 2,
        student: "Bob Tran",
        course: "IELTS Preparation Course",
        classId: 2,
        rating: 4,
        comment: "Very helpful for my IELTS exam. More practice tests would be nice.",
        date: "2024-05-18",
    },
    {
        id: 3,
        student: "Linh Pham",
        course: "English Conversation Club",
        classId: 3,
        rating: 5,
        comment: "Fun and interactive! I feel more confident speaking English.",
        date: "2024-05-15",
    },
];

export default function Feedback() {
    const [search, setSearch] = useState('');
    const [searchBy, setSearchBy] = useState('student');

    const filtered = initialFeedback.filter(f => {
        if (searchBy === 'student') {
            return f.student.toLowerCase().includes(search.toLowerCase());
        }
        if (searchBy === 'course') {
            return f.course.toLowerCase().includes(search.toLowerCase());
        }
        if (searchBy === 'class') {
            const className = classes.find(cls => cls.id === f.classId)?.name || '';
            return className.toLowerCase().includes(search.toLowerCase());
        }
        if (searchBy === 'comment') {
            return f.comment.toLowerCase().includes(search.toLowerCase());
        }
        // Default: search all
        return (
            f.student.toLowerCase().includes(search.toLowerCase()) ||
            f.course.toLowerCase().includes(search.toLowerCase()) ||
            f.comment.toLowerCase().includes(search.toLowerCase())
        );
    });

    return (
        <TeacherLayout>
            <div className="w-full p-8 bg-gray-50 min-h-screen">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Feedback</h2>
                </div>
                <div className="bg-white rounded-xl shadow p-6 mb-6">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <div className="w-full md:flex items-center gap-2">
                            <div className="w-full md:w-1/2 relative flex-1">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    <Search className="w-5 h-5" />
                                </span>
                                <input
                                    type="text"
                                    placeholder={`Search by ${searchBy}...`}
                                    className="border border-gray-300 rounded pl-10 pr-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-200"
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                />
                            </div>
                            <div className="w-full md:w-1/2 flex items-center gap-2">
                                <span className="w-32 text-sm font-medium text-gray-600">Search By: </span>
                                <select
                                    className="border border-gray-300 rounded pl-3 pr-10 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-200"
                                    value={searchBy}
                                    onChange={e => setSearchBy(e.target.value)}
                                >
                                    <option value="student">Student</option>
                                    <option value="course">Course</option>
                                    <option value="class">Class</option>
                                    <option value="comment">Comment</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="">
                    <table className="min-w-full bg-white shadow-md rounded-lg border border-gray-200">
                        <thead>
                            <tr className="text-left text-gray-600 border-b">
                                <th className="py-3 px-4">Student</th>
                                <th className="py-3 px-4">Course</th>
                                <th className="py-3 px-4">Class</th>
                                <th className="py-3 px-4">Rating</th>
                                <th className="py-3 px-4">Content</th>
                                <th className="py-3 px-4">Date</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-800">
                            {filtered.map(fb => (
                                <tr key={fb.id} className="border-b last:border-none">
                                    <td className="py-4 px-4 font-medium">{fb.student}</td>
                                    <td className="py-4 px-4">{fb.course}</td>
                                    <td className="py-4 px-4">
                                        {classes.find(cls => cls.id === fb.classId)?.name || `ID: ${fb.classId}`}
                                    </td>
                                    <td className="py-4 px-4">
                                        <div className="flex items-center gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-4 h-4 ${i < fb.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                                    fill={i < fb.rating ? '#facc15' : 'none'}
                                                />
                                            ))}
                                        </div>
                                    </td>
                                    <td className="py-4 px-4">{fb.comment}</td>
                                    <td className="py-4 px-4">{fb.date}</td>
                                </tr>
                            ))}
                            {filtered.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="py-8 text-center text-gray-400">
                                        No feedback found.
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