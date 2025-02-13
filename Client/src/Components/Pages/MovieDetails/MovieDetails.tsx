import { useGetDetailsMovies } from "../../../Api/ApiNode/get/getDetailsMovies";

import BtnMovieDetails from "./BtnMovieDetails";

import LoadingSpinner from "../../Utility/Loading/Loading";
import MovieReviews from "./MovieReviews/MovieReviews";
import MovieGraph from "../../Modals/ModalMovieGraph/ModalMovieGraph";

const MovieDetails: React.FC = () => {
  const { movieDetails, loading } = useGetDetailsMovies();

  if (!movieDetails && loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <LoadingSpinner />
      </div>
    );
  }

  if (!movieDetails) return null;

  return (
    <div className="d-flex flex-column justify-content-center align-items-center ">
      <div
        className="modalMovieDetailsMobile d-flex gap-5 "
        style={{
          overflow: "hidden",
          marginTop: "15rem",
        }}
      >
        <img
          src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
          alt={movieDetails.title}
          className="img-fluid rounded"
          style={{ maxWidth: "30rem", height: "40rem" }} // Ajustado para um tamanho médio
        />

        <div className="col-md-8 text-white text-center text-md-start">
          <h2 className="fw-semibold">{movieDetails.title}</h2>
          <p className="fs-5 fw-semibold text-warning">
            {movieDetails.overview}
          </p>
          <h5 className="fs-4 fw-semibold">Release date:</h5>
          <p className="fs-4 fw-semibold text-warning">
            {movieDetails.release_date}
          </p>
          <div className="d-flex flex-column">
            <h5 className="fs-4 fw-semibold ">
              {`Recommended movies based on ${movieDetails.title}: `}
            </h5>
          </div>

          <BtnMovieDetails />
        </div>
      </div>

      <MovieReviews movieId={movieDetails.movieId} />
      <MovieGraph movieId={movieDetails.movieId} title={movieDetails.title} />
    </div>
  );
};

export default MovieDetails;
