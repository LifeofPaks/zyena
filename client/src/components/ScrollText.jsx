import React from "react";

const ScrollText = ({
  text = "● Prom 2025 Booking Now Available. Flexible Payment Plan. Free Delivery Within USA",
}) => {
  return (
    <div className="relative w-full overflow-hidden bg-gray-900 py-4">
      <div className="marquee flex whitespace-nowrap animate-scroll">
        {Array.from({ length: 8 }).map((_, index) => (
          <span key={index} className="text-white text-[11px] lg:text-[13px] px-8 !ml-12">
            {text}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ScrollText;
