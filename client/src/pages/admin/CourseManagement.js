import { useState } from "react";
import { Plus, Search, Edit, Eye, Trash2, FileDown, X } from "lucide-react";
import AdminLayout from "../../layouts/AdminLayout";

const initialCourses = [
  {
    id: 1,
    name: "Business English Fundamentals",
    description: "Learn essential business communication skills",
    level: "intermediate",
    duration: "12 weeks",
    price: 299,
    maxStudents: 15,
    status: "active",
  },
  {
    id: 2,
    name: "IELTS Preparation Course",
    description: "Comprehensive IELTS exam preparation",
    level: "advanced",
    duration: "8 weeks",
    price: 399,
    maxStudents: 12,
    status: "active",
  },
  {
    id: 3,
    name: "English Conversation Club",
    description: "Practice speaking in a relaxed environment",
    level: "beginner",
    duration: "6 weeks",
    price: 149,
    maxStudents: 20,
    status: "active",
  },
];

const levelColors = {
  beginner: "bg-gray-100 text-gray-800",
  intermediate: "bg-gray-200 text-gray-900",
  advanced: "bg-blue-600 text-white",
};

export default function Courses() {
  const [courses] = useState(initialCourses);
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("all");
  const [status, setStatus] = useState("all");

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesLevel = level === "all" || course.level === level;
    const matchesStatus = status === "all" || course.status === status;
    return matchesSearch && matchesLevel && matchesStatus;
  });
  const handleClearFilters = () => {
    setSearch("");
    setLevel("all");
    setStatus("all");
  };
  return (
    <AdminLayout>
      <div className="w-full p-8 bg-gray-50 min-h-screen">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Courses</h2>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md font-semibold shadow hover:bg-green-700">
              <FileDown className="w-5 h-5" /> Export
            </button>
            <button className="flex items-center gap-2 px-5 py-2 bg-blue-500 text-white rounded-md font-semibold shadow hover:bg-blue-600">
              <Plus className="w-5 h-5" /> Add Course
            </button>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <div className="grid grid-cols-1  md:grid md:grid-cols-4 md:gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Search</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Search className="w-5 h-5" />
                </span>
                <input
                  type="text"
                  placeholder="Search courses..."
                  className="border border-gray-300 rounded pl-10 pr-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-200"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Level</label>
              <select
                className="border border-gray-300 rounded px-3 py-2 w-full"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                className="border border-gray-300 rounded px-3 py-2 w-full"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="col-span-1 md:col-span-1 flex justify-end">
              <button
                onClick={handleClearFilters}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-sm text-gray-700 font-medium border border-gray-300 rounded-md shadow-sm transition duration-150"
              >
                <X className="w-4 h-4" />
                Clear Filters
              </button>
            </div>
          </div>
        </div>
        <div className="">
          <table className="min-w-full bg-white shadow-md  border border-gray-200">
            <thead>
              <tr className="text-left text-gray-600 border-b">
                <th className="py-3 px-4">Course Name</th>
                <th className="py-3 px-4">Level</th>
                <th className="py-3 px-4">Duration</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Max Students/Class</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {filteredCourses.map((course) => (
                <tr key={course.id} className="border-b last:border-none">
                  <td className="py-4 px-4">
                    <div className="font-semibold">{course.name}</div>
                    <div className="text-gray-500 text-sm">
                      {course.description}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        levelColors[course.level]
                      }`}
                    >
                      {course.level}
                    </span>
                  </td>
                  <td className="py-4 px-4">{course.duration}</td>
                  <td className="py-4 px-4">${course.price.toFixed(2)}</td>
                  <td className="py-4 px-4">{course.maxStudents}</td>
                  <td className="py-4 px-4">
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {course.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex gap-3">
                      <button
                        className="text-gray-600 hover:text-blue-600"
                        title="Edit"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        className="text-gray-600 hover:text-blue-600"
                        title="View"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button
                        className="text-gray-600 hover:text-red-500"
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredCourses.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gray-400">
                    No courses found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
