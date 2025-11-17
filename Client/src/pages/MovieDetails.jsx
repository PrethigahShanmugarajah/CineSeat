import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BlurCircle from "../components/BlurCircle";
import { FaHeart, FaPlayCircle, FaRegHeart, FaStar } from "react-icons/fa";
import timeFormat from "../lib/timeFormat";
import DateSelect from "../components/DateSelect";
import MovieCard from "../components/MovieCard";
import Loading from "../components/Loading";
import Button from "../components/Button";
import { useAppContext } from "../context/AppContext";
import { notify } from "../components/ToastProvider";

const MovieDetails = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);

  const {
    axios,
    user,
    getToken,
    navigate,
    shows,
    favouriteMovies,
    fetchFavouriteMovies,
    image_base_url,
  } = useAppContext();

  const getShow = async () => {
    try {
      const { data } = await axios.get(`/api/show/${id}`);

      if (data.success) {
        setShow(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFavorite = async () => {
    try {
      if (!user) return notify.error("Please login to proceed");

      const { data } = await axios.post(
        "/api/user/update-favorite",
        { movieId: id },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );

      if (data.success) {
        await fetchFavouriteMovies();
        notify.success(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getShow();
  }, [id]);

  return show ? (
    <div className="px-6 md:px-16 lg:px-40 pt-30 md:pt-50">
      <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
        <img
          src={image_base_url + show.movie.poster_path}
          alt=""
          className="max-md:mx-auto rounded-xl h-104
        max-w-70 object-cover"
        />

        <div className="relative flex flex-col gap-3">
          <BlurCircle top="-100px" left="-100px" />

          <p className="text-primary">TAMIL</p>

          <h1>{show.movie.title}</h1>

          <div className="flex items-center gap-2 text-gray-300">
            <FaStar className="w-5 h-5 text-primary fill-primary" />
            {show.movie.vote_average.toFixed(1)} User Rating
          </div>

          <p className="text-white mt-2 text-sm leading-tight max-w-xl">
            {show.movie.overview}
          </p>

          <p>
            {timeFormat(show.movie.runtime)} ●{" "}
            {show.movie.genres.map((genre) => genre.name).join(",")} ●{" "}
            {show.movie.release_date.split("-")[0]}
          </p>

          <div className="flex items-center flex-wrap gap-4 mt-4">
            <Button
              className="flex gap-2 px-7 py-3 active:scale-95"
              variant="secondary"
            >
              <FaPlayCircle className="w-5 h-5" />
              Watch Trailer
            </Button>

            <Button
              text={"Buy Tickets"}
              onClick={() => {
                const element = document.getElementById("dateSelect");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-10 py-3 active:scale-95"
              variant="primary"
            />

            <button
              onClick={handleFavorite}
              className="bg-gray-700 p-2.5 rounded-full transition cursor-pointer active:scale-95"
            >
              {favouriteMovies.find((movie) => movie._id === id) ? (
                <FaHeart className="w-5 h-5 text-primary" />
              ) : (
                <FaRegHeart className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      <p className="text-lg font-medium mt-20">Your Favourite Cast</p>

      <div className="overflow-x-auto no-scrollbar mt-8 pb-4">
        <div className="flex items-center gap-4 w-max px-4">
          {show.movie.casts.slice(0, 12).map((cast, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <img
                src={image_base_url + cast.profile_path}
                alt=""
                className="rounded-full h-20 md:h-20 aspect-square object-cover"
              />

              <p className="font-medium text-xs mt-3">{cast.name}</p>
            </div>
          ))}
        </div>
      </div>

      <DateSelect dateTime={show.dateTime} id={id} />

      <p className="text-lg font-medium mt-20 mb-8">You May Also Like</p>

      <div className="flex flex-wrap max-sm:justify-center gap-8 justify-center">
        {shows.slice(0, 5).map((movie, index) => (
          <MovieCard key={index} movie={movie} />
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
  ) : (
    <Loading />
  );
};

export default MovieDetails;
