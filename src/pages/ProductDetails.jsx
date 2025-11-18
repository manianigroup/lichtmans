import { useLocation, Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight, FiHome, FiX } from "react-icons/fi";
import { useState } from 'react';

const ProductDetails = () => {
  const location = useLocation();
  const product = location.state?.product;
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!product) {
    return (
      <div className="flex flex-col justify-center items-center h-screen px-4 text-center">
        <p className="text-lg text-gray-700 p-4 items-center">Product not found.</p>
        <Link to="/products" className="text-blue-500 hover:underline ml-2">
          Go back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col justify-start items-center px-4 sm:px-6 lg:px-10 pt-10 sm:pt-10 lg:pt-10">
      {/* Breadcrumbs */}
      <nav className="flex items-center text-sm text-gray-500 self-start mb-2">
        <Link to="/" className="flex items-center hover:text-rose-800">
          <FiHome className="mr-1" /> Home
        </Link>
        <FiChevronRight className="mx-2" />
        <Link to="/products" className="hover:text-rose-800">
          Products
        </Link>
        <FiChevronRight className="mx-2" />
        <span className="text-rose-800 font-medium truncate max-w-[160px] sm:max-w-none">
          {product.name}
        </span>
      </nav>

      {/* Product Content */}
      <div className="flex flex-col md:flex-row items-center justify-center mt-6 gap-10 md:gap-16 lg:gap-24 w-full max-w-6xl">
        {/* Product Image */}
        <div
          className="flex justify-center items-center w-full lg:w-[450px] lg:h-[650px] p-2 border border-gray-200 rounded-lg shadow cursor-zoom-in hover:scale-[1.02] transition-transform duration-300"
          onClick={() => setIsModalOpen(true)}
        >
          <img
            src={
              product.image && product.image !== ""
                ? product.image
                : "/images/placeholder-bottle.png"
            }
            alt={product.name}
            className="rounded-md
              w-[250px] h-[350px]
              sm:w-[280px] sm:h-[380px]
              md:w-[300px] md:h-[400px]
              lg:w-[320px] lg:h-[420px]
              xl:w-[350px] xl:h-[450px] object-contain"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col items-start justify-start w-full lg:w-1/2 gap-5">
          <h1 className="text-2xl sm:text-3xl font-semibold text-rose-800">
            {product.name}
          </h1>

          {/* Description */}
          {product.description && (
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              {product.description}
            </p>
          )}

          {/* Product availability */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <p className="text-2xl sm:text-3xl font-bold text-rose-800">
              ${product.price}
            </p>
            <p className="text-green-600 font-medium">In Stock</p>
          </div>

          {/* Product details */}
          <div className="flex flex-col gap-1 mt-4">
            <p className="text-xl font-semibold text-gray-700">
              Product details
            </p>
            <p className="text-sm italic text-gray-600">
              Brand :{" "}
              <span className="font-semibold italic">{product.brand}</span>
            </p>
            <p className="text-sm italic text-gray-600">
              Type of product :{" "}
              <span className="font-semibold italic">{product.type}</span>
            </p>
            {product.subType ? (
              <p className="text-sm italic text-gray-600">
                Style :{" "}
                <span className="font-semibold italic">{product.subType}</span>
              </p>
            ) : null}
            <p className="text-sm italic text-gray-600">
              Bottle size :{" "}
              <span className="font-semibold italic">{product.quantity}ml</span>
            </p>
          </div>

          {/* Order Options */}
          <div className="my-6 w-full">
            <p className="text-gray-700 text-base font-medium">
              Want to place an order?
            </p>

            {/* DoorDash Button */}
            <a
              href="https://www.doordash.com/convenience/store/37209085/?event_type=autocomplete&pickup=false"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center justify-center w-full sm:w-auto px-6 py-3 
               bg-rose-800 text-white font-semibold rounded-lg shadow-lg 
               hover:bg-rose-900 transition-all duration-300"
            >
              Order Online via DoorDash
            </a>

            {/* Divider */}
            <div className="flex items-center my-4">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="px-3 text-gray-500 text-sm font-medium">OR</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            {/* Contact Us Link */}
            <p className="text-gray-600 text-sm sm:text-base">
              Prefer to order by phone?{" "}
              <Link
                to="/contact"
                className="text-rose-800 font-medium hover:underline"
              >
                Contact us here
              </Link>
              .
            </p>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="relative">
            {/* Close button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute -top-10 right-0 bg-white text-black rounded-full p-2 hover:bg-gray-200 transition"
            >
              <FiX size={20} />
            </button>

            {/* Enlarged Image */}
            <img
              src={
                product.image && product.image !== ""
                  ? product.image
                  : "/images/placeholder-bottle.png"
              }
              alt={product.name}
              className="max-w-[90vw] max-h-[80vh] object-contain rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
