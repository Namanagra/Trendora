import React from "react";
import mensCollectionSection from "../../assets/mens-collection.webp";
import womensCollectionSection from "../../assets/womens-collection.webp";
import { Link } from "react-router-dom";

const GenderCollectionSection = () => {
  return (
    <section className="py-16 px-4 lg:px-0 bg-white">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          {/* Women's collection */}
          <div className="relative flex-1 group overflow-hidden rounded-lg">
            <div className="relative h-[500px] md:h-[600px]">
              <img
                src={womensCollectionSection}
                alt="Women's Collection"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20 transition-opacity duration-300 group-hover:bg-black/30"></div>
            </div>
            <div className="absolute bottom-8 left-8 right-8 max-w-md">
              <div className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 group-hover:shadow-lg">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-3">
                  Women's Collection
                </h2>
                <Link 
                  to="/collections/all?gender=Women" 
                  className="inline-flex items-center text-gray-700 font-medium hover:text-gray-900 transition-colors border-b border-transparent hover:border-gray-900 pb-1"
                >
                  Shop Now
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Men's collection */}
          <div className="relative flex-1 group overflow-hidden rounded-lg">
            <div className="relative h-[500px] md:h-[600px]">
              <img
                src={mensCollectionSection}
                alt="Men's Collection"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20 transition-opacity duration-300 group-hover:bg-black/30"></div>
            </div>
            <div className="absolute bottom-8 left-8 right-8 max-w-md">
              <div className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 group-hover:shadow-lg">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-3">
                  Men's Collection
                </h2>
                <Link 
                  to="/collections/all?gender=Men" 
                  className="inline-flex items-center text-gray-700 font-medium hover:text-gray-900 transition-colors border-b border-transparent hover:border-gray-900 pb-1"
                >
                  Shop Now
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GenderCollectionSection;