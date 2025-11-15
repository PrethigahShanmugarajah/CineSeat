// CineSeat / Client / src / components / Loading.jsx
import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-[80vh]">
      <div className="animate-spin rounded-full h-24 w-24 border-t-10 border-primary border-solid"></div>
    </div>
  );
};

export default Loading;
