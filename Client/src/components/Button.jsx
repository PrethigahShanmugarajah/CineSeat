// CineSeat/Client/src/components/Button.jsx
import React from "react";

const Button = ({ text, onClick, className, type, variant }) => {
  const variants = {
    primary:
      "bg-primary text-white border border-primary hover:bg-primary-dull",
    secondary: "bg-transparent text-black border border-black hover:bg-gray-50",
    text: "bg-transparent text-black border-none hover:bg-transparent",
  };

  const baseClasses = `cursor-pointer px-8 py-2 rounded-md transition hover:rounded-full ${variants[variant]}`;

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${className || ""}`}
    >
      {text}
    </button>
  );
};

export default Button;
