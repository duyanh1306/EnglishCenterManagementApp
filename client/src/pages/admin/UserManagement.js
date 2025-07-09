import { useEffect, useState } from "react";
import axios from "axios";
import { Plus, Search, Edit, Eye, X } from "lucide-react";
import AdminLayout from "../../layouts/AdminLayout";
import AddUserModal from "../../components/admin/AddUserModal";
import UpdateUserModal from "../../components/admin/UpdateUserModal";
import ShowUserDetailModal from "../../components/admin/ShowUserDetailModal";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("all");
  const [roles, setRoles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // // Lấy thông tin user hiện tại từ token
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (!token) return;

  //   const fetchCurrentUser = async () => {
  //     try {
  //       const decoded = JSON.parse(atob(token.split(".")[1])); // decode JWT payload
  //       setCurrentUser(decoded);
  //     } catch (error) {
  //       console.error("Invalid token", error);
  //       setCurrentUser(null);
  //     }
  //   };

  //   fetchCurrentUser();
  // }, []);

  // // Lấy danh sách user nếu là admin
  // const fetchUsers = async () => {
  //   try {
  //     const res = await axios.get("http://localhost:9999/api/users", {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     });
  //     setUsers(res.data.data || []);
  //   } catch (err) {
  //     console.error("Lỗi khi lấy danh sách người dùng:", err);
  //   }
  // };

  // useEffect(() => {
  //   if (currentUser?.role === "Admin") {
  //     fetchUsers();
  //   }
  // }, [currentUser]);

  const fetchUserById = async (userId) => {
    try {
      const res = await axios.get(`http://localhost:9999/api/users/${userId}`);
      return res.data.data;
    } catch (error) {
      console.error("Lỗi khi lấy thông tin người dùng:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:9999/api/users");
        setUsers(res.data.data || []);
      } catch (err) {
        console.error("Lỗi khi lấy danh sách người dùng:", err);
      }
    };

    const fetchRoles = async () => {
      try {
        const res = await axios.get("http://localhost:9999/api/roles");
        setRoles(res.data.data || []);
      } catch (err) {
        console.error("Lỗi khi lấy roles:", err);
      }
    };

    fetchUsers();
    fetchRoles();
  }, []);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.fullName.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole =
      role === "all" || user.roleId?.name?.toLowerCase() === role.toLowerCase();
    return matchesSearch && matchesRole;
  });

  const handleClearFilters = () => {
    setSearch("");
    setRole("all");
  };

  return (
    <AdminLayout>
      <div className="w-full p-8 bg-gray-50 min-h-screen">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Users</h2>
          <div className="flex items-center gap-2">
            <button
              className="flex items-center gap-2 px-5 py-2 bg-blue-500 text-white rounded-md font-semibold shadow hover:bg-blue-600"
              onClick={() => setShowModal(true)}
            >
              <Plus className="w-5 h-5" /> Add User
            </button>
          </div>
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
                  placeholder="Search users..."
                  className="border border-gray-300 rounded pl-10 pr-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-200"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Role</label>
              <select
                className="border border-gray-300 rounded px-3 py-2 w-full"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="all">All Roles</option>
                {roles.map((r) => (
                  <option key={r._id} value={r.name}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end items-end">
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
                <th className="py-3 px-4">Full Name</th>
                <th className="py-3 px-4">Username</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Phone Number</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Date of Birth</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {filteredUsers.map((user) => (
                <tr key={user._id} className="border-b last:border-none">
                  <td className="py-4 px-4 font-semibold">{user.fullName}</td>
                  <td className="py-4 px-4">{user.userName}</td>
                  <td className="py-4 px-4">{user.email}</td>
                  <td className="py-4 px-4">{user.number}</td>
                  <td className="py-4 px-4 capitalize">{user.roleId?.name}</td>
                  <td className="py-4 px-4">
                    {new Date(user.birthday).toLocaleDateString("vi-VN", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex gap-3">
                      <button
                        className="text-gray-600 hover:text-blue-600"
                        title="Edit"
                        onClick={async () => {
                          const freshUser = await fetchUserById(user._id);
                          if (freshUser) {
                            setSelectedUser(freshUser);
                            setShowUpdateModal(true);
                          }
                        }}
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        className="text-gray-600 hover:text-blue-600"
                        title="View"
                        onClick={async () => {
                          const freshUser = await fetchUserById(user._id);
                          if (freshUser) {
                            setSelectedUser(freshUser);
                            setShowDetailModal(true);
                          }
                        }}
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gray-400">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <AddUserModal
          onClose={() => setShowModal(false)}
          onCreate={(newUser) => {
            setUsers((prev) => [...prev, newUser]);
            setShowModal(false);
          }}
        />
      )}
      {showUpdateModal && selectedUser && (
        <UpdateUserModal
          user={selectedUser}
          onClose={() => {
            setSelectedUser(null);
            setShowUpdateModal(false);
          }}
          onUpdate={(updatedUser) => {
            setUsers((prevUsers) =>
              prevUsers.map((u) =>
                u._id === updatedUser._id ? updatedUser : u
              )
            );
            setShowUpdateModal(false);
          }}
        />
      )}
      {showDetailModal && selectedUser && (
        <ShowUserDetailModal
          user={selectedUser}
          onClose={() => {
            setSelectedUser(null);
            setShowDetailModal(false);
          }}
        />
      )}
    </AdminLayout>
  );
}
