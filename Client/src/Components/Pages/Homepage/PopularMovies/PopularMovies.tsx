import LoadingSpinner from "../../../Utility/Loading/Loading";
import { usePopularMovies } from "./useMoviePopular";
import { motion } from "framer-motion";

const PopularMovies = () => {
  const { getVisibleMovies, isLoading } = usePopularMovies();
  const visibleMovies = getVisibleMovies();

  // Verifique se a lista de filmes está carregada e tem pelo menos 5 filmes
  if (isLoading || !visibleMovies || visibleMovies.length < 5) {
    return <LoadingSpinner />;
  }

  return (
    <motion.div
      className="mb-4"
      whileInView={{ opacity: 1, x: 0 }}
      initial={{ opacity: 0, x: -100 }}
      transition={{ duration: 1.5 }}
    >
      <h2 className="text-center fw-semibold mb-5">Popular Movies</h2>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ overflow: "hidden" }}
      >
        {/* Verifique se a posição do filme existe antes de renderizar */}
        {visibleMovies[0] && (
          <div
            className="carousel-movie smallImg"
            style={{
              width: "10rem",
              height: "15rem",
              margin: "0 5px",
              transition: "transform 0.5s ease, opacity 0.5s ease",
              opacity: 0.3,
            }}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${visibleMovies[0].poster_path}`}
              alt={visibleMovies[0].title}
              className="img-fluid"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        )}

        {visibleMovies[1] && (
          <div
            className="carousel-movie leftImgPopularMovies"
            style={{
              width: "200px",
              height: "300px",
              margin: "0 10px",
              transition: "transform 0.5s ease, opacity 0.5s ease",
              opacity: 0.6,
            }}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${visibleMovies[1].poster_path}`}
              alt={visibleMovies[1].title}
              className="img-fluid"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        )}

        {visibleMovies[2] && (
          <div
            className="carousel-movie center"
            style={{
              width: "300px",
              height: "400px",
              margin: "0 10px",
              transition: "transform 0.5s ease, opacity 0.5s ease",
              transform: "scale(1)",
              opacity: 1,
            }}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${visibleMovies[2].poster_path}`}
              alt={visibleMovies[2].title}
              className="img-fluid"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        )}

        {visibleMovies[3] && (
          <div
            className="carousel-movie rightImgPopularMovies"
            style={{
              width: "200px",
              height: "300px",
              margin: "0 10px",
              transition: "transform 0.5s ease, opacity 0.5s ease",
              opacity: 0.6,
            }}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${visibleMovies[3].poster_path}`}
              alt={visibleMovies[3].title}
              className="img-fluid"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        )}

        {visibleMovies[4] && (
          <div
            className="carousel-movie smallImg"
            style={{
              width: "10rem",
              height: "15rem",
              margin: "0 5px",
              transition: "transform 0.5s ease, opacity 0.5s ease",
              opacity: 0.3,
            }}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${visibleMovies[4].poster_path}`}
              alt={visibleMovies[4].title}
              className="img-fluid"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default PopularMovies;
