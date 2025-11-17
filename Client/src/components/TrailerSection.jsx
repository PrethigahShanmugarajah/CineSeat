import React, { useEffect, useState } from "react";
import { dummyTrailers } from "../assets/assets";
import ReactPlayer from "react-player";
import BlurCircle from "./BlurCircle";
import Title from "./Title";
import { FaPlayCircle } from "react-icons/fa";

const TrailerSection = () => {
  const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0]);

  const handleTrailerSelect = (trailer) => {
    setCurrentTrailer(trailer);
  };

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-44 py-20 overflow-hidden">
      <Title text1={"Trailers"} />

      <div className="relative mt-6">
        <BlurCircle top="-100px" right="-100px" />
        <ReactPlayer
          url={currentTrailer.videoUrl}
          controls={true}
          className="mx-auto max-w-full"
          width="960px"
          height="540px"
        />
      </div>

      <div className="group grid grid-cols-2 gap-4 md:gap-8 mt-8 max-w-3xl mx-auto">
        {dummyTrailers.map((trailer) => (
          <div
            key={trailer.image}
            className={`relative group-hover:not-hover:opacity-50 hover:-translate-y-1 duration-300 transition max-md:h-60 cursor-pointer ${
              currentTrailer.image === trailer.image
                ? "ring-2 ring-primary rounded-lg scale-105 opacity-100"
                : "opacity-70"
            }`}
            onClick={() => handleTrailerSelect(trailer)}
          >
            <img
              src={trailer.image}
              alt="Trailer"
              className="rounded-lg w-full h-full object-cover brightness-75"
            />

            <FaPlayCircle
              strokeWidth={1.6}
              className="absolute top-1/2 left-1/2 w-5 md:w-8 h-5 md:h-12 transform -translate-x-1/2 -translate-y-1/2"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrailerSection;
