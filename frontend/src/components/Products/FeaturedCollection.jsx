import React from "react";
import { Link } from "react-router-dom";
import featured from "../../assets/featured.webp";

const FeaturedCollection = () => {
  return (
    <section className="py-20 px-4 lg:px-0">
      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center bg-gradient-to-r from-green-50 to-green-100 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        {/* Left Content */}
        <div className="lg:w-1/2 p-12 text-center lg:text-left">
          <span className="inline-block text-sm font-medium text-green-700 bg-green-200 px-3 py-1 rounded-full mb-4">
            New Collection
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 leading-tight">
            Apparel designed for <br className="hidden lg:block" />
            <span className="text-green-600">your everyday life</span>
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-lg leading-relaxed">
            Discover premium quality, comfortable clothing that effortlessly blends
            fashion and function. Designed to make you look and feel great every
            day.
          </p>
          <Link
            to="/collections/all"
            className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
          >
            Shop Now →
          </Link>
        </div>

        {/* Right content */}
        <div className="lg:w-1/2 relative">
          <div className="absolute inset-0 bg-gradient-to-l from-green-100/30 to-green-100/0 z-10 pointer-events-none"></div>
          <img 
            src={featured} 
            alt="Featured Collection" 
            className="w-full h-full object-cover lg:min-h-[500px]"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;