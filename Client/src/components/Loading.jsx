import React, { useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";

const Loading = () => {
  const { navigate } = useAppContext();
  const { nextUrl } = useParams();

  useEffect(() => {
    if (nextUrl) {
      setTimeout(() => {
        navigate("/" + nextUrl);
      }, 8000);
    }
  }, []);

  return (
    <div className="flex items-center justify-center h-[80vh]">
      <div className="animate-spin rounded-full h-24 w-24 border-t-10 border-primary border-solid"></div>
    </div>
  );
};

export default Loading;
