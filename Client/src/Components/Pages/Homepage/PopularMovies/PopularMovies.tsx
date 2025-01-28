import LoadingSpinner from "../../../Utility/Loading/Loading";
import { usePopularMovies } from "./useMoviePopular";

const PopularMovies = () => {
  const { getVisibleMovies, isLoading } = usePopularMovies();
  const visibleMovies = getVisibleMovies();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="mb-4">
      <h2 className="text-center fw-semibold mb-5">Popular Movies</h2>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ overflow: "hidden" }}
      >
        <div
          className="carousel-movie smallImg"
          style={{
            width: "10rem",
            height: "15rem",
            margin: "0 5px",
            transition: "transform 0.5s ease, opacity 0.5s ease",
            opacity: 0.3, // Mais transparente
          }}
        >
          <img
            src={`https://image.tmdb.org/t/p/w500${visibleMovies[0].poster_path}`}
            alt={visibleMovies[0].title}
            className="img-fluid"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

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
      </div>
    </div>
  );
};

export default PopularMovies;
