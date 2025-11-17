import React from "react";
import { useNavigate } from "react-router-dom";
import BlurCircle from "./BlurCircle";
import { FaArrowRight } from "react-icons/fa";
import MovieCard from "./MovieCard";
import Button from "./Button";
import Title from "./Title";
import { useAppContext } from "../context/AppContext";

const FeaturedSection = () => {
  const navigate = useNavigate();
  const { shows } = useAppContext();

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-24 overflow-hidden">
      <div className="relative flex items-center justify-between pt-20 pb-20">
        <BlurCircle top="0" right="-80px" />
        <Title text1={"Now"} text2={"Showing"} />

        <Button
          text={
            <span className="group flex items-center gap-2 text-base text-gray-300">
              View All
              <FaArrowRight className="group-hover:translate-x-0.5 transition w-5" />
            </span>
          }
          onClick={() => navigate("/movies")}
          variant="text"
        />
      </div>

      <div className="flex flex-wrap max-sm:justify-center justify-center gap-8 mt-8">
        {shows.slice(0, 4).map((show) => (
          <MovieCard key={show._id} movie={show} />
        ))}
      </div>

      <div className="flex justify-center mt-20">
        <Button
          text={"Show More"}
          onClick={() => {
            navigate("/movies");
            scrollTo(0, 0);
          }}
          variant={"primary"}
        />
      </div>
    </div>
  );
};

export default FeaturedSection;
