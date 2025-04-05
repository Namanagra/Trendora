import React, { useEffect, useRef, useState } from "react";
import { FaFilter, FaTimes } from "react-icons/fa";
import FilterSidebar from "../components/Products/FilterSidebar";
import SortOptions from "../components/Products/SortOptions";
import ProductGrid from "../components/Products/ProductGrid";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductByFilters } from "../redux/slices/productsSlice";
import { motion, AnimatePresence } from "framer-motion";

const CollectionPage = () => {
  const { collections } = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const queryParams = Object.fromEntries([...searchParams]);
  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    console.log("Dispatching with:", {
      collections: collections || "all",
      ...queryParams,
    });
    dispatch(
      fetchProductByFilters({
        collections: collections || "all",
        page: queryParams.page || 1,
        limit: queryParams.limit || 12,
        ...queryParams,
      })
    );
  }, [dispatch, collections, searchParams]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-400 py-12 px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            {collections ? `${collections} Collection` : "All Products"}
          </h1>
          <p className="mt-2 text-gray-300">
            {loading ? "Loading..." : `Showing ${products.length} products`}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Button */}
          <div className="lg:hidden flex justify-between items-center mb-4">
            <button
              onClick={toggleSidebar}
              className="flex items-center justify-center px-4 py-2 bg-gray-900 text-white rounded-md shadow hover:bg-gray-800 transition-colors"
              aria-label="Toggle filters"
            >
              <FaFilter className="mr-2" /> Filters
            </button>
            <SortOptions />
          </div>

          {/* Filter Sidebar - Mobile */}
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.div
                initial={{ opacity: 0, x: -300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ type: "spring", damping: 25 }}
                className="fixed inset-0 z-50 overflow-hidden"
              >
                <div className="absolute inset-0 bg-black/0"></div>
                <div className="absolute inset-y-0 left-0 max-w-full flex">
                  <div
                    ref={sidebarRef}
                    className="relative w-screen max-w-xs h-full bg-white shadow-xl"
                  >
                    <div className="absolute top-0 right-0 p-2">
                      <button
                        onClick={toggleSidebar}
                        className="text-gray-500 hover:text-gray-700 focus:outline-none"
                      >
                        <FaTimes className="h-6 w-6" />
                      </button>
                    </div>
                    <div className="h-full overflow-y-auto py-6 px-4">
                      <FilterSidebar collection={collections} />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Filter Sidebar - Desktop */}
          <div className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-24">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  
                </h3>
                <FilterSidebar collection={collections} />
              </div>
            </div>
          </div>

          {/* Product Content */}
          <div className="flex-grow">
            {/* Sort Options - Desktop */}
            <div className="hidden lg:block mb-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-700">
                  {loading ? "Loading..." : `${products.length} products found`}
                </h3>
                <SortOptions />
              </div>
            </div>

            {/* Product Grid */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <ProductGrid products={products} loading={loading} error={error} />
            </div>

            {/* Loading State */}
            {loading && (
              <div className="mt-8 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-gray-900"></div>
                <p className="mt-2 text-gray-600">Loading products...</p>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="mt-8 p-4 bg-red-50 rounded-lg text-red-700">
                <p>Error loading products: {error}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionPage;