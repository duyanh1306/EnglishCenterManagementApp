import React from "react";
import { Bell, Menu} from "lucide-react"; // Lucide: bộ icon Tailwind-friendly

const Navbar = ({ user = { name: "John Doe", avatarUrl: "" }, onLogout, onToggleSidebar }) => {
    return (
        <div className="w-full bg-white px-4 py-2 shadow-md flex items-center justify-between">
            {/* Left: Toggle + Title */}
            <div className="flex items-center gap-4">
                <button onClick={onToggleSidebar} className="p-2 rounded hover:bg-gray-100">
                    <Menu className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-semibold text-gray-800">English Center</h1>
            </div>

            {/* Center */}
            <div className="flex-1 px-4">

            </div>

            {/* Right: Notification + Avatar + Name + Logout */}
            <div className="flex items-center gap-4">
                <button className="relative p-2 rounded hover:bg-gray-100">
                    <Bell className="w-6 h-6 text-gray-600" />
                    {/* Badge notification nếu cần */}
                    <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full" />
                </button>

                {/* Avatar + Name */}
                <div className="flex items-center gap-2">
                    <img
                        src={user.avatarUrl || "https://via.placeholder.com/32"}
                        alt="avatar"
                        className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-gray-700 font-medium">{user.name}</span>
                </div>

                {/* Logout */}
                <button
                    onClick={onLogout}
                    className="text-sm text-white bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded-md"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Navbar;
