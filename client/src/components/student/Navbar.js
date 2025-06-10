import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-white shadow px-6 py-3 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-800">Student Panel</h1>
      <div className="flex items-center gap-4">
        <span className="text-gray-600">John Doe</span>
        <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
