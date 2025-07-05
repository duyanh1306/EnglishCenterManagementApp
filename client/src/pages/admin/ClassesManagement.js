import { useState } from "react";
import { Plus, Search, Edit, Eye, Trash2, FileDown, X } from "lucide-react";
import AdminLayout from "../../layouts/AdminLayout";

const initialClasses = [
  {
    id: 1,
    name: "BEF - Weekday Morning",
    course: "Business English Fundamentals",
    teacher: "Mr. John Smith",
    schedule: "Mon, Wed, Fri - 9:00 AM to 11:00 AM",
    startDate: "2025-06-10",
    endDate: "2025-09-01",
  },
  {
    id: 2,
    name: "IELTS Advanced Evening",
    course: "IELTS Preparation Course",
    teacher: "Ms. Anna Nguyen",
    schedule: "Tue, Thu - 6:30 PM to 8:30 PM",
    startDate: "2025-07-01",
    endDate: "2025-08-26",
  },
  {
    id: 3,
    name: "Conversation Beginners",
    course: "English Conversation Club",
    teacher: "Mr. David Lee",
    schedule: "Sat - 10:00 AM to 12:00 PM",
    startDate: "2025-06-15",
    endDate: "2025-07-27",
  },
];

function getDurationInWeeks(start, end) {
  const diff = (new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24);
  return `${Math.ceil(diff / 7)} weeks`;
}

export default function ClassManagement() {
  const [classes] = useState(initialClasses);
  const [search, setSearch] = useState("");

  const filteredClasses = classes.filter((cls) => {
    const query = search.toLowerCase();
    return (
      cls.name.toLowerCase().includes(query) ||
      cls.course.toLowerCase().includes(query) ||
      cls.teacher.toLowerCase().includes(query)
    );
  });

  const handleClearFilters = () => {
    setSearch("");
  };

  return (
    <AdminLayout>
      <div className="w-full p-8 bg-gray-50 min-h-screen">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Classes</h2>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md font-semibold shadow hover:bg-green-700">
              <FileDown className="w-5 h-5" /> Export
            </button>
            <button className="flex items-center gap-2 px-5 py-2 bg-blue-500 text-white rounded-md font-semibold shadow hover:bg-blue-600">
              <Plus className="w-5 h-5" /> Add Class
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-sm font-medium mb-1">Search</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Search className="w-5 h-5" />
                </span>
                <input
                  type="text"
                  placeholder="Search class, course or teacher..."
                  className="border border-gray-300 rounded pl-10 pr-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-200"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="md:col-span-2"></div>
            {/* clear filter button */}
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

        <div>
          <table className="min-w-full bg-white shadow-md border border-gray-200">
            <thead>
              <tr className="text-left text-gray-600 border-b">
                <th className="py-3 px-4">Class Name</th>
                <th className="py-3 px-4">Course</th>
                <th className="py-3 px-4">Teacher</th>
                <th className="py-3 px-4">Schedule</th>
                <th className="py-3 px-4">Start Date</th>
                <th className="py-3 px-4">End Date</th>
                <th className="py-3 px-4">Duration</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {filteredClasses.map((cls) => (
                <tr key={cls.id} className="border-b last:border-none">
                  <td className="py-4 px-4 font-semibold">{cls.name}</td>
                  <td className="py-4 px-4">{cls.course}</td>
                  <td className="py-4 px-4">{cls.teacher}</td>
                  <td className="py-4 px-4">{cls.schedule}</td>
                  <td className="py-4 px-4">{cls.startDate}</td>
                  <td className="py-4 px-4">{cls.endDate}</td>
                  <td className="py-4 px-4">
                    {getDurationInWeeks(cls.startDate, cls.endDate)}
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
              {filteredClasses.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-gray-400">
                    No classes found.
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
