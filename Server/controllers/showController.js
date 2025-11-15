// CineSeat / Server / controllers / showController.js
import axios from "axios";
import Movie from "../models/Movie.js";
import Show from "../models/Show.js";

/* -------- GET NOW PLAYING MOVIES LIST -------- */
export const getNowPlayingMovies = async (req, res) => {
  try {
    const { data } = await axios.get(
      "https://api.themoviedb.org/3/movie/now_playing",
      {
        headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` },
      }
    );

    const movies = data.results;

    return res.status(200).json({
      success: true,
      message: "Now Playing Movies Fetched Successfully",
      movies: movies,
    });
  } catch (error) {
    console.error("Get Now Playing Movies List Error:", error.message);

    return res.status(500).json({
      success: false,
      message: `Get Now Playing Movies List Error: ${error.message}`,
    });
  }
};

/* -------- ADD A NEW SHOW TO THE DATABASE -------- */
export const addShow = async (req, res) => {
  try {
    const { movieId, showsInput, showPrice } = req.body;

    let movie = await Movie.findById(movieId);

    if (!movie) {
      // Fetch Movie Details and Credits from TMDB API
      const [movieDetailsResponse, movieCreditsResponse] = await Promise.all([
        axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
          headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` },
        }),
        axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
          headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` },
        }),
      ]);

      const movieApiData = movieDetailsResponse.data;
      const movieCreditsData = movieCreditsResponse.data;

      const movieDetails = {
        _id: movieId,
        title: movieApiData.title,
        overview: movieApiData.overview,
        poster_path: movieApiData.poster_path,
        backdrop_path: movieApiData.backdrop_path,
        genres: movieApiData.genres,
        casts: movieCreditsData.cast,
        release_date: movieApiData.release_date,
        original_language: movieApiData.original_language,
        tagline: movieApiData.tagline || "",
        vote_average: movieApiData.vote_average,
        runtime: movieApiData.runtime,
      };

      // Add Movie to the Database
      movie = await Movie.create(movieDetails);
    }

    const showsToCreate = [];

    showsInput.forEach((show) => {
      const showDate = show.date;
      show.time.forEach((time) => {
        const dateTimeString = `${showDate}T${time}`;
        showsToCreate.push({
          movie: movieId,
          showDateTime: new Date(dateTimeString),
          showPrice,
          occupiedSeats: {},
        });
      });
    });

    if (showsToCreate.length > 0) {
      await Show.insertMany(showsToCreate);
    }

    return res.status(200).json({
      success: true,
      message: "Show Added Successfully",
    });
  } catch (error) {
    console.error("Add a New Show to the Database Error:", error.message);

    return res.status(500).json({
      success: false,
      message: `Add a New Show to the Database Error: ${error.message}`,
    });
  }
};

/* -------- GET ALL SHOWS FROM THE DATABASE -------- */
export const getShows = async (req, res) => {
  try {
    const shows = await Show.find({ showDateTime: { $gte: new Date() } })
      .populate("movie")
      .sort({ showDateTime: 1 });

    // Filter Unique Shows
    const uniqueShows = new Set(shows.map((show) => show.movie));

    return res
      .status(200)
      .json({ success: true, shows: Array.from(uniqueShows) });
  } catch (error) {
    console.error("Get All Shows from the Database Error:", error.message);

    return res.status(500).json({
      success: false,
      message: `Get All Shows from the Database Error: ${error.message}`,
    });
  }
};
