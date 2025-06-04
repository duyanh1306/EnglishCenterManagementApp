import React from "react";
import {
  Users,
  GraduationCap,
  UserCheck,
  UserPlus,
  BookOpen,
  CalendarCheck,
} from "lucide-react";
import AdminLayout from "../../layouts/AdminLayout";
import { useNavigate } from "react-router-dom";

const stats = [
  {
    label: "Total Users",
    value: 1,
    color: "bg-blue-600",
    icon: <Users className="h-6 w-6 text-white" />,
  },
  {
    label: "Teachers",
    value: 0,
    color: "bg-green-600",
    icon: <UserCheck className="h-6 w-6 text-white" />,
  },
  {
    label: "Students",
    value: 0,
    color: "bg-purple-600",
    icon: <GraduationCap className="h-6 w-6 text-white" />,
  },
  {
    label: "Parents",
    value: 0,
    color: "bg-orange-600",
    icon: <Users className="h-6 w-6 text-white" />,
  },
];

const actions = [
  {
    label: "Add New User",
    icon: <UserPlus className="h-5 w-5 text-blue-600" />,
    link: "/admin/users",
  },
  {
    label: "Create Course",
    icon: <BookOpen className="h-5 w-5 text-blue-600" />,
    link: "/admin/courses",
  },
  {
    label: "Schedule Class",
    icon: <CalendarCheck className="h-5 w-5 text-blue-600" />,
    link: "/admin/classes",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <AdminLayout>
      <div className="px-6 py-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600 mb-8">
          Overview of your learning management system
        </p>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`rounded-lg p-4 flex items-center justify-between text-white shadow ${stat.color}`}
            >
              <div>
                <p className="text-sm">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <div className="bg-white bg-opacity-20 p-2 rounded-full">
                {stat.icon}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions Section */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow border">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <ul className="space-y-4">
              {actions.map((action, index) => (
                <li
                  key={index}
                  className="flex items-center p-3 border rounded-lg hover:bg-gray-50 transition cursor-pointer"
                  onClick={() => navigate(action.link)}
                >
                  <span className="mr-3">{action.icon}</span>
                  <span className="text-sm font-medium">{action.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
