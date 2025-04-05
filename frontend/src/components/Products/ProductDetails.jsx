import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductDetails,
  fetchSimilarProducts,
} from "../../redux/slices/productsSlice";
import { addToCart } from "../../redux/slices/cartSlice";
import { FiPlus, FiMinus, FiShoppingCart } from "react-icons/fi";

const ProductDetails = ({ productId }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, loading, error, similarProducts } = useSelector(
    (state) => state.products
  );
  const { user, guestId } = useSelector((state) => state.auth);
  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const productFetchId = productId || id;

  useEffect(() => {
    if (productFetchId) {
      dispatch(fetchProductDetails(productFetchId));
      dispatch(fetchSimilarProducts({ id: productFetchId }));
    }
  }, [dispatch, productFetchId]);

  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImage(selectedProduct.images[0].url);
    }
  }, [selectedProduct]);

  const handleQuantityChange = (action) => {
    if (action === "plus") {
      setQuantity((prev) => prev + 1);
    }
    if (action === "minus" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select a size and color before adding to cart.", {
        duration: 1000,
      });
      return;
    }

    setIsButtonDisabled(true);

    dispatch(
      addToCart({
        productId: productFetchId,
        quantity,
        size: selectedSize,
        color: selectedColor,
        guestId,
        userId: user?._id,
      })
    )
      .then(() => {
        toast.success("Product added to cart!", {
          duration: 1000,
        });
      })
      .finally(() => {
        setIsButtonDisabled(false);
      });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!selectedProduct) {
    return (
      <div className="max-w-6xl mx-auto p-6 text-center">
        <p className="text-lg text-gray-600">Product not found</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {selectedProduct && (
          <div className="bg-white shadow-xl rounded-xl overflow-hidden">
            {/* Main Product Section */}
            <div className="flex flex-col lg:flex-row gap-8 p-6 md:p-8">
              {/* Image Gallery */}
              <div className="lg:w-1/2 flex flex-col-reverse md:flex-row gap-4">
                {/* Thumbnails */}
                <div className="hidden md:flex flex-col gap-3 w-20">
                  {selectedProduct.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setMainImage(image.url)}
                      className={`w-full aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        mainImage === image.url
                          ? "border-indigo-500 scale-105"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <img
                        src={image.url}
                        alt={image.altText || `Thumbnail ${index}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>

                {/* Main Image */}
                <div className="flex-1 relative">
                  <div className="aspect-square w-full bg-gray-100 rounded-xl overflow-hidden">
                    <img
                      src={mainImage}
                      alt="Main Product"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Mobile Thumbnails */}
                  <div className="mt-4 flex md:hidden gap-3 overflow-x-auto pb-2">
                    {selectedProduct.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setMainImage(image.url)}
                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
                          mainImage === image.url
                            ? "border-indigo-600"
                            : "border-gray-200"
                        }`}
                      >
                        <img
                          src={image.url}
                          alt={image.altText || `Thumbnail ${index}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="lg:w-1/2">
                <div className="space-y-6">
                  {/* Title and Price */}
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                      {selectedProduct.name}
                    </h1>
                    <div className="flex items-center gap-3 mt-2">
                      {selectedProduct.originalPrice && (
                        <span className="text-lg text-gray-500 line-through">
                          ${selectedProduct.originalPrice}
                        </span>
                      )}
                      <span className="text-2xl font-semibold text-gray-700">
                        ${selectedProduct.price}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600">{selectedProduct.description}</p>

                  {/* Color Selection */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Color</h3>
                    <div className="flex gap-2 mt-2">
                      {selectedProduct.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`w-10 h-10 rounded-full border-2 transition-all ${
                            selectedColor === color
                              ? "border-gray-600 scale-110"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                          style={{ backgroundColor: color.toLowerCase() }}
                          aria-label={`Select color ${color}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Size Selection */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedProduct.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-4 py-2 rounded-md border text-sm font-medium transition-all ${
                            selectedSize === size
                              ? "bg-indigo-500 text-white border-indigo-600"
                              : "bg-white text-gray-900 border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quantity */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      Quantity
                    </h3>
                    <div className="flex items-center gap-4 mt-2">
                      <button
                        onClick={() => handleQuantityChange("minus")}
                        className="p-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50"
                        disabled={quantity <= 1}
                      >
                        <FiMinus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-medium">
                        {quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange("plus")}
                        className="p-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50"
                      >
                        <FiPlus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Add to Cart */}
                  <button
                    onClick={handleAddToCart}
                    disabled={isButtonDisabled}
                    className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-md font-medium transition-colors ${
                      isButtonDisabled
                        ? "bg-indigo-400 cursor-not-allowed"
                        : "bg-indigo-600 hover:bg-indigo-700"
                    } text-white shadow-sm`}
                  >
                    <FiShoppingCart className="w-5 h-5" />
                    {isButtonDisabled ? "Adding..." : "Add to Cart"}
                  </button>

                  {/* Product Details */}
                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-3">
                      Product Details
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Brand</p>
                        <p className="font-medium">{selectedProduct.brand}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Material</p>
                        <p className="font-medium">
                          {selectedProduct.material}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Similar Products */}
            <div className="border-t border-gray-200 px-6 py-8 md:px-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
                You May Also Like
              </h2>
              <ProductGrid
                products={similarProducts}
                loading={loading}
                error={error}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
