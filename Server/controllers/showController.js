// CineSeat / Server / controllers / showController.js
import axios from "axios";

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
