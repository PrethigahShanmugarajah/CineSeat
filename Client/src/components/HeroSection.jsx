import React from "react";
import { assets } from "../assets/assets";
import { FaArrowRight, FaCalendar, FaRegClock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-36 bg-[url("/BackgroundImage.jpg")] bg-cover bg-center h-screen'>
      <img src={assets.Ags} alt="" className="max-h-11 lg:h-11 mt-20" />
      <h1 className="text-5xl md:text-[70px] md:leading-18 font-semibold max-w-110">
        The Greatest of <br />
        All Time
      </h1>

      <div className="flex items-center gap-4 text-gray-300">
        <span>Action | Sci-Fi | Drama</span>
        <div className="flex items-center gap-1">
          <FaCalendar className="w-4.5 h-4.5" />
          2024
        </div>

        <div className="flex items-center gap-1">
          <FaRegClock className="w-4.5 h-4.5" />
          3h 3m
        </div>
      </div>

      <p className="max-w-md text-gray-300">
        A high-octane sci-fi thriller where a retired agent returns for one last
        mission that could change the course of humanity. Packed with futuristic
        action, emotion, and Vijay’s powerful performance.
      </p>

      <Button
        text={
          <span className="flex items-center gap-1">
            Explore Movies
            <FaArrowRight className="w-5" />
          </span>
        }
        onClick={() => navigate("/movies")}
        variant="primary"
      />
    </div>
  );
};

export default HeroSection;
