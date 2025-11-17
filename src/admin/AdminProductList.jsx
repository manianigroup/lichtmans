import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import EditProduct from "./EditProduct";
import { API_BASE } from '../api';
import { FiChevronLeft, FiChevronRight, FiEdit } from "react-icons/fi";


const BASE_URL = `${API_BASE}/api/products`;

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const fetchProducts = async () => {
    const res = await fetch(BASE_URL);
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const indexOfLast = currentPage * perPage;
  const indexOfFirst = indexOfLast - perPage;
  const currentProducts = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / perPage);

  // Reset page to 1 when perPage changes
  const handlePerPageChange = (e) => {
    setPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="w-full overflow-x-hidden">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center mb-4 gap-3 sm:gap-4">
        {/* Make search bar take full remaining width */}
        <div className="flex-1 w-full">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search product..."
          />
        </div>

        {/* Per page selector */}
        <div className="flex-shrink-0 flex items-center justify-end sm:justify-start">
          <label className="mr-2 text-sm sm:text-base">Show:</label>
          <select
            value={perPage}
            onChange={handlePerPageChange}
            className="border border-gray-300 rounded p-2 focus:ring-2 focus:ring-rose-800 focus:outline-none"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
          </select>
        </div>
      </div>

      {/* Product list */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border border-gray-300 bg-white shadow">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Quantity</th>
              <th className="p-2 border">Stock</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((p) => (
              <tr key={p._id} className="text-center hover:bg-gray-50">
                <td className="border p-2">{p.name}</td>
                <td className="border p-2">${p.price}</td>
                <td className="border p-2">{p.quantity}ml</td>
                <td className="border p-2">{p.stock}</td>
                <td className="border p-2">
                  <button
                    onClick={() => setEditingProduct(p)}
                    className="hover:bg-gray-400 px-3 py-1 rounded mr-2"
                  >
                    <FiEdit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {currentProducts.map((p) => (
          <div key={p._id} className="bg-white border border-gray-300 rounded-lg shadow p-4">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold text-lg text-gray-800 flex-1">{p.name}</h3>
              <button
                onClick={() => setEditingProduct(p)}
                className="ml-2 text-gray-600 hover:bg-gray-200 p-2 rounded"
                aria-label="Edit product"
              >
                <FiEdit size={20} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-gray-600">Price:</span>
                <span className="ml-2 font-medium">${p.price}</span>
              </div>
              <div>
                <span className="text-gray-600">Quantity:</span>
                <span className="ml-2 font-medium">{p.quantity}ml</span>
              </div>
              <div className="col-span-2">
                <span className="text-gray-600">Stock:</span>
                <span className="ml-2 font-medium">{p.stock}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {currentProducts.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No products found.
        </div>
      )}

      {/* Pagination buttons */}
      <div className="flex flex-wrap justify-center items-center gap-1 sm:gap-2 mt-4">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-2 sm:px-3 py-1 sm:py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
        >
          <FiChevronLeft className="" />
        </button>

        {/* Page number buttons */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => setCurrentPage(num)}
            className={`px-2 sm:px-3 py-1 sm:py-2 border rounded text-sm sm:text-base ${
              currentPage === num ? "bg-gray-300 font-bold" : "hover:bg-gray-100"
            }`}
          >
            {num}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-2 sm:px-3 py-1 sm:py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
        >
          <FiChevronRight />
        </button>
      </div>

      {/* Page info for mobile */}
      <div className="text-center mt-2 text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </div>

      {editingProduct && (
        <EditProduct
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          refresh={fetchProducts}
        />
      )}
    </div>
  );
};

export default ProductList;
