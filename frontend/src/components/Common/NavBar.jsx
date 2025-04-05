import React, { useState } from "react";
import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiBars3BottomRight,
} from "react-icons/hi2";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import CartDrawer from "../Layout/CartDrawer";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";

const NavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const cartItemCount =
    cart?.products?.reduce((total, product) => total + product.quantity, 0) ||
    0;

  const toggleNavDrawer = () => {
    setNavDrawerOpen(!navDrawerOpen);
  };

  const toggleCartDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <nav className="container mx-auto flex items-center justify-between py-4 px-6 border-b border-gray-100">
        {/* Left-Logo */}
        <div>
          <Link 
            to="/" 
            className="text-2xl font-semibold tracking-tight text-gray-900 hover:text-black transition-colors"
          >
            Trendora
          </Link>
        </div>

        {/* Center-Navigation-Links */}
        <div className="hidden md:flex space-x-8">
          <Link
            to="/collections/all?gender=Men"
            className="text-gray-600 hover:text-black text-sm font-medium uppercase tracking-wider transition-colors"
          >
            Men
          </Link>
          <Link
            to="/collections/all?gender=Women"
            className="text-gray-600 hover:text-black text-sm font-medium uppercase tracking-wider transition-colors"
          >
            Women
          </Link>
          <Link
            to="/collections/all?category=Top Wear"
            className="text-gray-600 hover:text-black text-sm font-medium uppercase tracking-wider transition-colors"
          >
            Top Wear
          </Link>
          <Link
            to="/collections/all?category=Bottom Wear"
            className="text-gray-600 hover:text-black text-sm font-medium uppercase tracking-wider transition-colors"
          >
            Bottom Wear
          </Link>
        </div>

        {/* Right-Icons */}
        <div className="flex items-center space-x-6">
          {user && user.role === "admin" && (
            <Link
              to="/admin"
              className="hidden md:block bg-gray-900 hover:bg-gray-800 px-3 py-1 rounded-md text-sm text-white transition-colors"
            >
              Admin
            </Link>
          )}

          <Link 
            to="/profile" 
            className="hover:text-black transition-colors"
          >
            <HiOutlineUser className="h-5 w-5 text-gray-600" />
          </Link>
          
          <button
            onClick={toggleCartDrawer}
            className="relative hover:text-black transition-colors"
          >
            <HiOutlineShoppingBag className="h-5 w-5 text-gray-600" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>
          
          <div className="overflow-hidden">
            <SearchBar />
          </div>

          <button 
            onClick={toggleNavDrawer} 
            className="md:hidden hover:text-black transition-colors"
          >
            <HiBars3BottomRight className="h-6 w-6 text-gray-600" />
          </button>
        </div>
      </nav>

      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

      {/* Mobile Navigation */}
      <div
        className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-xl transform transition-transform duration-300 z-50 ${
          navDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-5 border-b border-gray-100">
          <button 
            onClick={toggleNavDrawer}
            className="hover:text-black transition-colors"
          >
            <IoMdClose className="h-6 w-6 text-gray-500" />
          </button>
        </div>
        <div className="p-5">
          <h2 className="text-xl font-semibold mb-6 text-gray-900">Menu</h2>
          <nav className="space-y-5">
            <Link
              to="/collections/all?gender=Men"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black py-2 transition-colors"
            >
              Men
            </Link>
            <Link
              to="/collections/all?gender=Women"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black py-2 transition-colors"
            >
              Women
            </Link>
            <Link
              to="/collections/all?category=Top Wear"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black py-2 transition-colors"
            >
              Top Wear
            </Link>
            <Link
              to="/collections/all?category=Bottom Wear"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black py-2 transition-colors"
            >
              Bottom Wear
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default NavBar;