import React from "react";
import { IoLogoInstagram } from "react-icons/io5";
import { RiTwitterXLine } from "react-icons/ri";
import { FaFacebookF } from "react-icons/fa";
import { FiPhoneCall, FiMail, FiMapPin } from "react-icons/fi";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Newsletter Section */}
          <div className="lg:pr-8">
            <h3 className="text-xl font-semibold text-white mb-6">Join Our Community</h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Subscribe to our newsletter for exclusive offers, style tips, and early access to new collections.
            </p>
            <form className="flex flex-col space-y-4">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white placeholder-gray-500"
                required
              />
              <button
                type="submit"
                className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-md transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
            <p className="mt-4 text-sm text-gray-500">
              By subscribing, you agree to our Privacy Policy
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: "New Arrivals", path: "/" },
                { name: "Best Sellers", path: "/" },
                { name: "Men's Collection", path: "/collections/mens" },
                { name: "Women's Collection", path: "/collections/womens" },
                { name: "Sale Items", path: "/" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center"
                  >
                    <span className="w-1 h-1 bg-gray-500 rounded-full mr-2"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-6">Customer Service</h3>
            <ul className="space-y-3">
              {[
                { name: "Contact Us", path: "/contact" },
                { name: "FAQs", path: "/faqs" },
                { name: "Shipping Policy", path: "/shipping" },
                { name: "Returns & Exchanges", path: "/returns" },
                { name: "Size Guide", path: "/size-guide" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center"
                  >
                    <span className="w-1 h-1 bg-gray-500 rounded-full mr-2"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-6">Get In Touch</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <FiMapPin className="text-primary-500 mt-1 mr-3 flex-shrink-0" />
                <p className="text-gray-400">
                  GIT, Sitapura<br />
                  Jaipur, India
                </p>
              </div>
              <div className="flex items-center">
                <FiPhoneCall className="text-primary-500 mr-3" />
                <a href="tel:0123456789" className="text-gray-400 hover:text-white transition-colors duration-300">
                  (012) 345-6789
                </a>
              </div>
              <div className="flex items-center">
                <FiMail className="text-primary-500 mr-3" />
                <a href="mailto:info@trendora.com" className="text-gray-400 hover:text-white transition-colors duration-300">
                  info@trendora.com
                </a>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-white mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                {[
                  { icon: <FaFacebookF className="h-5 w-5" />, url: "/" },
                  { icon: <IoLogoInstagram className="h-5 w-5" />, url: "https://www.instagram.com/blexed._corzo/" },
                  { icon: <RiTwitterXLine className="h-5 w-5" />, url: "/" },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800 hover:bg-primary-600 text-white p-2 rounded-full transition-colors duration-300"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Trendora. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy-policy" className="text-gray-500 hover:text-white text-sm transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-500 hover:text-white text-sm transition-colors duration-300">
              Terms of Service
            </Link>
            <Link to="/cookies" className="text-gray-500 hover:text-white text-sm transition-colors duration-300">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;