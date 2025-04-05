import React from "react";
import {
  HiArrowPathRoundedSquare,
  HiOutlineCreditCard,
  HiShoppingBag,
} from "react-icons/hi2";

const FeaturesSection = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Feature 1 */}
        <div className="flex flex-col items-center group">
          <div className="p-5 mb-5 rounded-full bg-gray-50 group-hover:bg-indigo-50 transition-colors duration-300">
            <HiShoppingBag className="text-2xl text-indigo-600" />
          </div>
          <h4 className="text-lg font-medium text-gray-900 mb-3 tracking-tight">
            FREE INTERNATIONAL SHIPPING
          </h4>
          <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
            On all orders over $100 with fast worldwide delivery
          </p>
        </div>

        {/* Feature 2 */}
        <div className="flex flex-col items-center group">
          <div className="p-5 mb-5 rounded-full bg-gray-50 group-hover:bg-indigo-50 transition-colors duration-300">
            <HiArrowPathRoundedSquare className="text-2xl text-indigo-600" />
          </div>
          <h4 className="text-lg font-medium text-gray-900 mb-3 tracking-tight">
            45 DAYS RETURN
          </h4>
          <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
            Hassle-free returns with money back guarantee
          </p>
        </div>

        {/* Feature 3 */}
        <div className="flex flex-col items-center group">
          <div className="p-5 mb-5 rounded-full bg-gray-50 group-hover:bg-indigo-50 transition-colors duration-300">
            <HiOutlineCreditCard className="text-2xl text-indigo-600" />
          </div>
          <h4 className="text-lg font-medium text-gray-900 mb-3 tracking-tight">
            SECURE CHECKOUT
          </h4>
          <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
            Fully encrypted and secure payment process
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
