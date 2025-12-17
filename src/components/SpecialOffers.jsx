import { useState, useEffect } from "react";
import { FiX, FiTag, FiClock } from "react-icons/fi";
import { API_BASE } from "../api";

const BASE_URL = `${API_BASE}/api/offers`;

const SpecialOffers = () => {
  const [offers, setOffers] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch offers
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await fetch(BASE_URL);
        if (!res.ok) throw new Error("Failed to fetch offers");
        const data = await res.json();
        setOffers(data);
      } catch (err) {
        console.error("Error fetching offers:", err);
      }
    };
    fetchOffers();
  }, []);

  // Filter currently valid offers
  const validOffers = offers
    .filter((offer) => {
      if (!offer.validUntil) return false;
      const today = new Date();
      const expiry = new Date(offer.validUntil);
      return expiry >= today; // Only valid ones
    })
    .slice(0, 4); // Show max 4

  const openModal = (offer) => {
    setSelectedOffer(offer);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOffer(null);
    document.body.style.overflow = "unset";
  };

  // Hide section if no valid offers
  if (validOffers.length === 0) return null;

  return (
    <>
      {/* Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-rose-50 to-amber-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-red-100 text-rose-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <FiTag className="animate-pulse" />
              Special Offers
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-rose-900 mb-3">
              Don’t Miss Out on Amazing Deals!
            </h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
              Exclusive discounts and limited-time offers
            </p>
          </div>

          {/* Offers Flex Layout */}
          <div className="flex flex-wrap justify-center gap-8">
            {validOffers.map((offer) => (
              <div
                key={offer._id}
                onClick={() => openModal(offer)}
                className="relative w-full h-[500px] sm:w-[50%] lg:w-[35%] bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-2"
              >
                {/* Badge */}
                {offer.badge && (
                  <div className="absolute top-4 right-4 bg-rose-800 text-white px-3 py-1 rounded-full text-xs font-bold z-10 shadow-lg animate-bounce">
                    {offer.badge}
                  </div>
                )}

                {/* Image */}
                <div className="relative h-48 bg-gradient-to-br from-rose-200 to-amber-200 overflow-hidden">
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src =
                        "/images/images-placeholder.png";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 hover:text-rose-800 transition-colors">
                    {offer.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {offer.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                    <FiClock className="text-rose-600" />
                    <span>Valid until {offer.validUntil}</span>
                  </div>
                  <button className="mt-auto w-full bg-gradient-to-r from-rose-800 to-rose-900 text-white py-2.5 rounded-lg font-semibold hover:from-rose-700 hover:to-red-800 transition-all duration-300 shadow-md cursor-pointer">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && selectedOffer && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-3xl mx-4 bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b bg-gradient-to-r from-rose-800 to-rose-900 text-white">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold">
                  {selectedOffer.title}
                </h3>
                <p className="text-sm text-rose-100 mt-1">
                  {selectedOffer.description}
                </p>
              </div>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Close modal"
              >
                <FiX size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex items-center justify-center bg-gray-50 h-[50vh] sm:h-[60vh]">
              <img
                src={selectedOffer.image}
                alt={selectedOffer.title}
                className="max-h-full max-w-full object-contain"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/800x600/e11d48/ffffff?text=Offer+Details";
                }}
              />
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-6 border-t bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FiClock className="text-rose-800" />
                  <span>Valid until {selectedOffer.validUntil}</span>
                </div>
                <button
                  onClick={closeModal}
                  className="px-6 py-2 bg-rose-800 text-white rounded-lg hover:bg-rose-900 transition-colors font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SpecialOffers;
