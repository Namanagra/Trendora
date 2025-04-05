import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProduct, fetchAdminProducts } from "../../redux/slices/adminProductSlice";

const ProductManagement = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (state) => state.adminProducts
  );

  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
    </div>
  );
  
  if (error) return (
    <div className="bg-red-900/20 border border-red-700 text-red-200 p-4 rounded-lg max-w-7xl mx-auto my-6">
      Error: {error}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white">Admin / Product Manager</h2>
        <p className="text-sm text-gray-400 mt-1">Manage all your products in one place</p>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-700">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-800">
            <tr>
              <th scope="col" className="py-3.5 px-4 text-left text-sm font-semibold text-gray-300">
                Name
              </th>
              <th scope="col" className="py-3.5 px-4 text-left text-sm font-semibold text-gray-300">
                Price
              </th>
              <th scope="col" className="py-3.5 px-4 text-left text-sm font-semibold text-gray-300">
                SKU
              </th>
              <th scope="col" className="py-3.5 px-4 text-left text-sm font-semibold text-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700 bg-gray-900">
            {products.length > 0 ? (
              products.map((product) => (
                <tr
                  key={product._id}
                  className="hover:bg-gray-800/50 transition-colors"
                >
                  <td className="whitespace-nowrap py-4 px-4 text-sm font-medium text-white">
                    {product.name}
                  </td>
                  <td className="whitespace-nowrap py-4 px-4 text-sm text-gray-300">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="whitespace-nowrap py-4 px-4 text-sm text-gray-300">
                    {product.sku}
                  </td>
                  <td className="whitespace-nowrap py-4 px-4 text-sm">
                    <div className="flex space-x-2">
                      <Link
                        to={`/admin/products/${product._id}/edit`}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-6 px-4 text-center text-sm text-gray-400">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagement;