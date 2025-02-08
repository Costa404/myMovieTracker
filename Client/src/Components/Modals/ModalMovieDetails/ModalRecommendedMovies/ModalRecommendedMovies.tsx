import ReactDOM from "react-dom";

import { useGetRecommendMovies } from "../../../../Api/ApiPython/getRecommendMovies";
import { useModalRecommendedMovieStore } from "./useRecommendedMoviesStore";
import ActionButton from "../../../Utility/ActionButton";
import { useTheme } from "../../../../Context/ThemeContext/ThemeContext";
import { motion } from "framer-motion";
import LoadingSpinner from "../../../Utility/Loading/Loading";
import { useMovieDetailsStore } from "../useMovieDetailsStore";
import { useNavigate } from "react-router-dom";

const ModalRecommendedMovies = () => {
  const { isModalRecommendedMovieOpen, closeModalRecommendedMovie } =
    useModalRecommendedMovieStore();
  const { recommendedMovies, loadingRecommendations } = useGetRecommendMovies();
  const navigate = useNavigate();
  const { setMovieName, setMovieId } = useMovieDetailsStore();
  const { theme } = useTheme();
  const handleMovieClick = (movieName: string, movieId: number) => {
    setMovieName(movieName);

    setMovieId(movieId);
    const movieSlug = movieName.replace(/\s+/g, "-").toLowerCase();
    navigate(`/movie/${movieSlug}`);
    closeModalRecommendedMovie();
  };

  if (!isModalRecommendedMovieOpen) return null;
  console.log("recommendedMovies dentro do componente:", recommendedMovies);

  return ReactDOM.createPortal(
    <div className="modal-overlay d-flex justify-content-center align-items-center  ">
      <div
        className="modal-content w-50  overflow-hidden modalMovieDetailsMobile"
        onClick={() => console.log("Clique detectado dentro do modal!")}
        style={{
          background: theme === "dark" ? "#121212" : "#c7c7c7",
          color: theme === "dark" ? "#333333" : "#e0e0e0",
          minHeight: "50vh",
        }}
      >
        <div className="modal-header border-0 mb-3">
          <h5 className="modal-title text-white fw-bold fs-4">
            Movie suggestion
          </h5>

          <ActionButton
            style={{ background: "#dc3545", border: "none" }}
            onClick={closeModalRecommendedMovie}
            label="Close"
          />
        </div>
        <div className="modal-body">
          {loadingRecommendations ? (
            <LoadingSpinner />
          ) : recommendedMovies.length > 0 ? (
            <div className="row">
              {recommendedMovies.map((movie, index) => {
                return (
                  <div key={index} className="col-6 col-md-4 col-lg-3 mb-3">
                    <motion.div
                      className="card hover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMovieClick(movie.title, movie.movie_id);
                      }}
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        className="card-img-top img-fluid"
                        alt={movie.title}
                        style={{ maxHeight: "15rem", objectFit: "contain" }}
                      />
                      <div className="card-body p-2">
                        <h6
                          className="card-title small text-center fs-5"
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {movie.title}
                        </h6>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-warning">Nenhuma recomendação disponível.</p>
          )}
        </div>
      </div>
    </div>,
    document.getElementById("modal-RecommendedMovies")!
  );
};

export default ModalRecommendedMovies;
