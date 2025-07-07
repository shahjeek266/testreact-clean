"use client";
import { useState } from "react";

const WalkthroughButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    console.log("Opening modal...");
    setIsOpen(true);
  };

  const handleClose = () => {
    console.log("Closing modal...");
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="bg-[#19345A] text-white text-sm font-semibold px-6 py-3 rounded-full shadow-md hover:bg-[#0f223f] transition"
      >
        WATCH WALKTHROUGH VIDEO
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[9999]"
          onClick={handleClose}
        >
          <div
            className="bg-white w-[90%] max-w-3xl rounded-lg overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-4 text-black text-2xl font-bold z-50"
            >
              ×
            </button>

            {/* YouTube iframe */}
            <div className="w-full h-[500px]">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/aze8KEBH2U0?autoplay=1"
                title="Walkthrough Video"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WalkthroughButton;
