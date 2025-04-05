import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchProductDetails,
  updateProduct,
} from "../../redux/slices/productsSlice";
import axios from "axios";

const EditProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { selectedProduct, loading, error } = useSelector(
    (state) => state.products
  );

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    countInStock: 0,
    sku: "",
    category: "",
    brand: "",
    sizes: [],
    colors: [],
    collections: "",
    material: "",
    gender: "",
    images: [],
  });

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetails(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedProduct) {
      setProductData(selectedProduct);
    }
  }, [selectedProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setProductData((prevData) => ({
        ...prevData,
        images: [...prevData.images, { url: data.imageUrl, altText: "" }],
      }));
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct({ id, productData }));
    navigate("/admin/products");
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
    </div>
  );

  if (error) return (
    <div className="bg-red-900/20 border border-red-700 text-red-200 p-4 rounded-lg max-w-5xl mx-auto my-6">
      Error: {error}
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white">Admin / Edit Product</h2>
        <p className="text-sm text-gray-400 mt-1">Update product details</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg p-6 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={productData.name}
                onChange={handleChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                value={productData.description}
                onChange={handleChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                rows={4}
                required
              />
            </div>

            {/* Price */}
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-300 mb-1">
                Price
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">$</span>
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={productData.price}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 pl-8 pr-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Count In Stock */}
            <div>
              <label htmlFor="countInStock" className="block text-sm font-medium text-gray-300 mb-1">
                Count in Stock
              </label>
              <input
                type="number"
                name="countInStock"
                id="countInStock"
                value={productData.countInStock}
                onChange={handleChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* SKU */}
            <div>
              <label htmlFor="sku" className="block text-sm font-medium text-gray-300 mb-1">
                SKU
              </label>
              <input
                type="text"
                name="sku"
                id="sku"
                value={productData.sku}
                onChange={handleChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Sizes */}
            <div>
              <label htmlFor="sizes" className="block text-sm font-medium text-gray-300 mb-1">
                Sizes (comma-separated)
              </label>
              <input
                type="text"
                name="sizes"
                id="sizes"
                value={productData.sizes.join(", ")}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    sizes: e.target.value.split(",").map((size) => size.trim()),
                  })
                }
                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Colors */}
            <div>
              <label htmlFor="colors" className="block text-sm font-medium text-gray-300 mb-1">
                Colors (comma-separated)
              </label>
              <input
                type="text"
                name="colors"
                id="colors"
                value={productData.colors.join(", ")}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    colors: e.target.value.split(",").map((color) => color.trim()),
                  })
                }
                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label htmlFor="image-upload" className="block text-sm font-medium text-gray-300 mb-1">
                Upload Image
              </label>
              <div className="flex items-center">
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md border border-gray-600 transition-colors"
                >
                  Choose File
                  <input
                    id="image-upload"
                    type="file"
                    onChange={handleImageUpload}
                    className="hidden"
                    accept="image/*"
                  />
                </label>
                {uploading && (
                  <span className="ml-3 text-sm text-gray-400">Uploading...</span>
                )}
              </div>
              <div className="flex flex-wrap gap-3 mt-3">
                {productData.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image.url}
                      alt={image.altText || "Product Image"}
                      className="w-16 h-16 object-cover rounded-md border border-gray-600"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 px-4 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProductPage;