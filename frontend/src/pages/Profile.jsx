import React, { useEffect } from "react";
import MyOrdersPage from "./MyOrdersPage";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/authSlice";
import { clearCart } from "../redux/slices/cartSlice";
import { FiLogOut, FiUser, FiMail } from "react-icons/fi";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-grow container mx-auto p-4 md:p-8 max-w-7xl">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          {/* Left section - Profile Card */}
          <div className="w-full md:w-1/3 lg:w-1/4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-24"></div>
              <div className="px-6 pb-6 pt-2 relative">
                <div className="flex justify-center -mt-12 mb-4">
                  <div className="h-20 w-20 rounded-full border-4 border-white bg-white shadow-md flex items-center justify-center">
                    <FiUser className="text-3xl text-gray-400" />
                  </div>
                </div>
                
                <h1 className="text-xl font-semibold text-gray-800 text-center mb-1">
                  {user?.name}
                </h1>
                <div className="flex items-center justify-center text-gray-500 mb-4">
                  <FiMail className="mr-2" />
                  <span className="text-sm">{user?.email}</span>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 bg-white text-red-500 py-2 px-4 rounded-lg border border-red-100 hover:bg-red-50 transition-colors duration-200 font-medium"
                >
                  <FiLogOut />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right section: Orders table */}
          <div className="w-full md:w-2/3 lg:w-3/4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Your Orders</h2>
              <MyOrdersPage />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;