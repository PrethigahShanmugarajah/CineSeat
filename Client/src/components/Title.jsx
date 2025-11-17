import React from "react";

const getTextColor = (index) =>
  index % 2 === 0 ? "text-primary" : "text-white";

const getLineColor = (numTexts) =>
  numTexts % 2 === 0 ? "bg-primary-dull" : "bg-white";

const Title = ({ ...texts }) => {
  const textValues = Object.values(texts);

  return (
    <div className="inline-flex gap-2 items-center mb-0">
      <p className="text-2xl md:text-3xl font-medium">
        {textValues.map((text, i) => (
          <span key={i} className={`${getTextColor(i)} font-medium`}>
            {text}{" "}
          </span>
        ))}
      </p>

      <p
        className={`w-8 sm:w-12 h-px sm:h-0.5 ${getLineColor(
          textValues.length
        )}`}
      ></p>
    </div>
  );
};

export default Title;
