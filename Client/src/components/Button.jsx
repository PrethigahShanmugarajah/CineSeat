// CineSeat/Client/src/components/Button.jsx
import React from "react";

const Button = ({ text, children, onClick, className, type, variant }) => {
  const variants = {
    primary:
      "bg-primary text-white border border-primary hover:bg-primary-dull",
    secondary: "bg-transparent text-white border border-white",
    text: "bg-transparent text-black border-none hover:bg-transparent",
  };

  const baseClasses = `cursor-pointer px-8 py-2 rounded-md transition hover:rounded-full ${variants[variant]}`;

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${className || ""}`}
    >
      {children || text}
    </button>
  );
};

export default Button;
