// CineSeat/Client/src/components/Title.jsx
import React from "react";

const Title = ({ text1, text2 }) => {
  return (
    <div className="inline-flex gap-2 items-center mb-0">
      <p className="text-primary text-2xl md:text-3xl font-medium">
        {text1} <span className="text-black font-medium">{text2}</span>
      </p>

      <p className="w-8 sm:w-12 h-px sm:h-0.5 bg-primary-dull"></p>
    </div>
  );
};

export default Title;
