import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const NewArrivals = () => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const [newArrivals, setNewArrivals] = useState([]);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`
        );
        setNewArrivals(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNewArrivals();
  }, []);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - startX;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const scroll = (direction) => {
    const scrollAmount = direction === "left" ? -300 : 300;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const updateScrollButtons = () => {
    const container = scrollRef.current;
    if (container) {
      const leftScroll = container.scrollLeft;
      const rightScrollable =
        container.scrollWidth > leftScroll + container.clientWidth;
      setCanScrollLeft(leftScroll > 0);
      setCanScrollRight(rightScrollable);
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollButtons);
      updateScrollButtons();
      return () => container.removeEventListener("scroll", updateScrollButtons);
    }
  }, [newArrivals]);

  return (
    <section className="py-16 px-4 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 relative">
          <span className="text-sm font-medium text-indigo-600 mb-2 block">
            New Collection
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explore New Arrivals
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the latest styles straight off the runway, freshly added to
            keep your wardrobe on the cutting edge of fashion.
          </p>

          {/* Scroll Controls */}
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 hidden md:flex space-x-2">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={`p-2 rounded-full shadow-md ${
                canScrollLeft
                  ? "bg-white text-indigo-600 hover:bg-indigo-50"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              } transition-colors duration-200`}
              aria-label="Scroll left"
            >
              <FiChevronLeft className="text-xl" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={`p-2 rounded-full shadow-md ${
                canScrollRight
                  ? "bg-white text-indigo-600 hover:bg-indigo-50"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              } transition-colors duration-200`}
              aria-label="Scroll right"
            >
              <FiChevronRight className="text-xl" />
            </button>
          </div>
        </div>

        {/* Product Carousel */}
        <div
          ref={scrollRef}
          className={`relative overflow-x-auto flex gap-6 pb-6 scrollbar-hide ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
        >
          {newArrivals.map((product) => (
            <div
              key={product._id}
              className="flex-shrink-0 w-72 sm:w-80 lg:w-96 relative group"
            >
              <div className="relative overflow-hidden rounded-xl aspect-[3/4]">
                <img
                  src={product.images[0]?.url}
                  alt={product.images[0]?.altText || product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  draggable="false"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <Link
                  to={`/product/${product._id}`}
                  className="block transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
                >
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-indigo-200 font-medium">
                    ${product.price.toFixed(2)}
                  </p>
                </Link>
                <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-1.5 rounded-full transition-colors">
                    Quick View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Scroll Controls */}
        <div className="flex justify-center space-x-4 mt-6 md:hidden">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`p-2 rounded-full shadow ${
              canScrollLeft
                ? "bg-white text-indigo-600"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            <FiChevronLeft className="text-xl" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`p-2 rounded-full shadow ${
              canScrollRight
                ? "bg-white text-indigo-600"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            <FiChevronRight className="text-xl" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
