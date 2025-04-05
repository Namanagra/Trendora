import React from "react";
import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";

const TopBar = () => {
  return (
    <div className="bg-gray-600 text-gray-200 text-sm">
      <div className="container mx-auto flex justify-between items-center py-3 px-4">
        {/* Social icons - left side */}
        <div className="hidden md:flex items-center space-x-4">
          <a href="/" className="hover:text-white transition-colors">
            <TbBrandMeta className="h-4 w-4" />
          </a>
          <a href="https://www.instagram.com/blexed._corzo/" className="hover:text-white transition-colors">
            <IoLogoInstagram className="h-4 w-4" />
          </a>
          <a href="/" className="hover:text-white transition-colors">
            <RiTwitterXLine className="h-4 w-4" />
          </a>
        </div>

        {/* Center message */}
        <div className="text-center flex-grow">
          <span className="font-medium">
            We Ship Worldwide - Fast & Reliable Shipping!
          </span>
        </div>

        {/* Phone number - right side */}
        <div className="hidden md:block">
          <a
            href="tel:+1234567890"
            className="hover:text-white transition-colors"
          >
            +1 (123) 456-7890
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
