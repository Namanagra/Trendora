import React from "react";
import { Link } from "react-router-dom";
import { Skeleton } from "@mui/material";

const ProductGrid = ({ products, loading, error }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="bg-white p-4 rounded-lg">
            <Skeleton variant="rectangular" width="100%" height={384} />
            <Skeleton variant="text" width="80%" />
            <Skeleton variant="text" width="40%" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-10">
        <p>No products available in this collection</p>
        <Link
          to="/"
          className="text-blue-500 hover:underline mt-2 inline-block"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Link
          key={product._id}
          to={`/product/${product._id}`}
          className="block hover:scale-105 transition-transform duration-200"
        >
          <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="w-full h-96 mb-4 overflow-hidden rounded-lg">
              <img
                src={product.images[0]?.url || "/placeholder-product.jpg"}
                alt={product.images[0]?.altText || product.name}
                className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                onError={(e) => {
                  e.target.src = "/placeholder-product.jpg";
                }}
              />
            </div>
            <h3 className="text-sm font-medium mb-1 line-clamp-2">
              {product.name}
            </h3>
            <p className="text-gray-900 font-semibold">
              ${product.price.toFixed(2)}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductGrid;
