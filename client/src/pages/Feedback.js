import TeacherLayout from '../layouts/TeacherLayout';
import { useState } from 'react';
import { Star, Search } from 'lucide-react';
import FeedbackService from '../services/FeedbackService';

export default function Feedback() {
  // Load feedback data from FeedbackService
  const [feedbacks] = useState(FeedbackService.getFeedback());
  const [search, setSearch] = useState('');
  const [searchBy, setSearchBy] = useState('student'); // options: student, course, class, comment

  const filtered = feedbacks.filter(fb => {
    const searchText = search.toLowerCase();
    if (searchBy === 'student') {
      return fb.user.toLowerCase().includes(searchText);
    }
    if (searchBy === 'course') {
      return fb.course.toLowerCase().includes(searchText);
    }
    if (searchBy === 'class') {
      return fb.class.toLowerCase().includes(searchText);
    }
    if (searchBy === 'comment') {
      return fb.content.toLowerCase().includes(searchText);
    }
    // Default: search all
    return (
      fb.user.toLowerCase().includes(searchText) ||
      fb.course.toLowerCase().includes(searchText) ||
      fb.content.toLowerCase().includes(searchText)
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
                  <td className="py-4 px-4 font-medium">{fb.user}</td>
                  <td className="py-4 px-4">{fb.course}</td>
                  <td className="py-4 px-4">{fb.class}</td>
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
                  <td className="py-4 px-4">{fb.content}</td>
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