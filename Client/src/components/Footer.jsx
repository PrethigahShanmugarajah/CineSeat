// CineSeat/Client/src/components/Footer.jsx
import React from "react";
import { assets } from "../assets/assets";
import { FaGooglePlay, FaApple } from "react-icons/fa";
import Button from "./Button";

const Footer = () => {
  return (
    <footer className="px-6 md:px-16 lg:px-36 mt-40 w-full text-white">
      <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500 pb-14">
        <div className="md:max-w-96">
          <img alt="" className="w-28 h-auto" src={assets.Logo} />

          <p className="mt-6 text-sm text-justify">
            CineSeat brings you the latest movies, trailers, and exclusive
            screenings. Stay updated with showtimes, book tickets instantly, and
            enjoy a seamless movie-going experience from the comfort of your
            device.
          </p>

          {/* <div className="flex items-center gap-2 mt-4">
            <img
              src={assets.googlePlay}
              alt="Google Play"
              className="h-9 w-auto"
            />

            <img src={assets.appStore} alt="App Store" className="h-9 w-auto" />
          </div> */}

          <div className="flex items-center gap-4 mt-4">
            <Button variant="secondary" className="flex items-center gap-3">
              <FaGooglePlay className="w-8 h-8" />
              <div className="flex flex-col">
                <span className="text-xs text-white">GET IT ON</span>
                <span className="text-sm font-semibold">Google Play</span>
              </div>
            </Button>

            <Button variant="secondary" className="flex items-center gap-3">
              <FaApple className="w-8 h-8" />
              <div className="flex flex-col leading-tight">
                <span className="text-xs ">Download on</span>
                <span className="text-sm font-semibold">App Store</span>
              </div>
            </Button>
          </div>
        </div>

        <div className="flex-1 flex items-start md:justify-end gap-20 md:gap-40">
          <div>
            <h2 className="font-semibold mb-5 text-2xl">Company</h2>
            <ul className="space-y-2 text-base">
              <li>
                <a href="#">Home</a>
              </li>

              <li>
                <a href="#">About us</a>
              </li>

              <li>
                <a href="#">Contact us</a>
              </li>

              <li>
                <a href="#">Privacy policy</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex-1 flex items-start md:justify-end gap-20 md:gap-40">
          <div>
            <h2 className="font-semibold mb-5 text-2xl">Get in touch</h2>
            <div className="text-base space-y-2">
              <p>+94 00 000 0000</p>
              <p>cineseat@cineseat.com</p>
            </div>
          </div>
        </div>
      </div>
      <p className="pt-4 text-center text-sm pb-5">
        Copyright {new Date().getFullYear()} © CineSeat. All Right Reserved.
      </p>
    </footer>
  );
};

export default Footer;
