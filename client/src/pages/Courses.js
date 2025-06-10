import TeacherLayout from "../layouts/TeacherLayout";
import { useState } from "react";
import { Plus, Search, Edit, Eye, Trash2 } from "lucide-react";
import CourseService from "../services/CourseService";

export default function Courses() {
  // Get courses data from CourseService
  const [courses] = useState(CourseService.getCourses());
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const levels = CourseService.getLevels();

  const [level, setLevel] = useState("all");

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus = status === "all" || course.status === status;
    const matchesLevel = level === "all" || course.level === level;
    return matchesSearch && matchesStatus && matchesLevel;
  });

  return (
    <TeacherLayout>
      <div className="w-full p-8 bg-gray-50 min-h-screen">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Courses</h2>
          <button className="flex items-center gap-2 px-5 py-2 bg-blue-500 text-white rounded-md font-semibold shadow hover:bg-blue-600">
            <Plus className="w-5 h-5" /> Add Course
          </button>
        </div>
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            <div>
              <label className="block text-sm font-medium mb-1">Level</label>
              <select
                className="border border-gray-300 rounded px-3 py-2 w-full"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
              >
                <option value="all">All Levels</option>
                {levels.map((level) => (
                  <option key={level.id} value={level.name}>
                    {level.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="">
          <table className="min-w-full bg-white shadow-md border border-gray-200">
            <thead>
              <tr className="text-left text-gray-600 border-b">
                <th className="py-3 px-4">Course Name</th>
                <th className="py-3 px-4">Level</th>
                <th className="py-3 px-4">Price(VND)</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {filteredCourses.map((course) => {
                const bgColor =
                  course?.status === "active" ? "bg-green-100" : "bg-red-100";
                const textColor =
                  course?.status === "active"
                    ? "text-green-800"
                    : "text-red-800";

                return (
                  <tr key={course.id} className="border-b last:border-none">
                    <td className="py-4 px-4">
                      <div className="font-semibold">{course?.name}</div>
                    </td>
                    <td className="py-4 px-4">{course?.level}</td>
                    <td className="py-4 px-4">{course?.price}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`${bgColor} ${textColor} px-3 py-1 rounded-full text-xs font-semibold`}
                      >
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
                );
              })}
              {filteredCourses.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-600">
                    No courses found.
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
