const DoorDashOrder = () => {
  return (
    <section className="w-full bg-rose-800 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Text */}
        <div className="text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-extrabold">
            Order From DoorDash
          </h2>
          <p className="mt-2 text-lg md:text-xl opacity-90">
            Get your favorite products delivered fast from Lichtman's Liquor Store.
          </p>
        </div>

        {/* Right Button */}
        <a
          href="https://www.doordash.com/convenience/store/37209085/?event_type=autocomplete&pickup=false" 
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-rose-800 font-bold text-lg px-6 py-3 rounded-full shadow-lg hover:bg-gray-100 transition-all"
        >
          Order Now
        </a>
      </div>
    </section>
  );
};

export default DoorDashOrder;


