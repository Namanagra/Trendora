import React from "react";
import {
  FaBoxOpen,
  FaClipboardList,
  FaSignOutAlt,
  FaStore,
  FaUser,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../redux/slices/authSlice";
import { clearCart } from "../../redux/slices/cartSlice";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate("/");
  };

  return (
    <div className="h-full p-6 bg-gray-900 border-r border-gray-800 flex flex-col">
      {/* Branding */}
      <div className="mb-8">
        <Link 
          to="/admin" 
          className="text-2xl font-bold text-white hover:text-indigo-300 transition-colors"
        >
          Trendora
        </Link>
        <p className="text-xs text-gray-400 mt-1">Admin Panel</p>
      </div>

      {/* Dashboard Title */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-300 px-2">Dashboard</h2>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            `flex items-center space-x-3 py-3 px-4 rounded-lg transition-all ${
              isActive
                ? "bg-gray-800 text-white font-medium border-l-4 border-indigo-500"
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
            }`
          }
        >
          <FaUser className="text-lg" />
          <span>Users</span>
        </NavLink>

        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            `flex items-center space-x-3 py-3 px-4 rounded-lg transition-all ${
              isActive
                ? "bg-gray-800 text-white font-medium border-l-4 border-indigo-500"
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
            }`
          }
        >
          <FaBoxOpen className="text-lg" />
          <span>Products</span>
        </NavLink>

        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            `flex items-center space-x-3 py-3 px-4 rounded-lg transition-all ${
              isActive
                ? "bg-gray-800 text-white font-medium border-l-4 border-indigo-500"
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
            }`
          }
        >
          <FaClipboardList className="text-lg" />
          <span>Orders</span>
        </NavLink>

        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center space-x-3 py-3 px-4 rounded-lg transition-all ${
              isActive
                ? "bg-gray-800 text-white font-medium border-l-4 border-indigo-500"
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
            }`
          }
        >
          <FaStore className="text-lg" />
          <span>Shop</span>
        </NavLink>
      </nav>

      {/* Logout Button */}
      <div className="mt-auto pt-4 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-lg bg-gray-800 text-red-400 hover:bg-gray-700 hover:text-red-300 transition-colors"
        >
          <FaSignOutAlt />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;