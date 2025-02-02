import ReactDOM from "react-dom";

import { useMovieDetailsStore } from "./useMovieDetailsStore";
import { useTheme } from "../../../Context/ThemeContext/ThemeContext";
import { AnimatePresence, motion } from "framer-motion";
import { useGetDetailsMovies } from "../../../Api/get/getDetailsMovies";
import BtnMovieDetails from "./BtnMovieDetails";

const MovieDetail: React.FC = () => {
  const { isModalOpen } = useMovieDetailsStore();
  const { movieDetails, loading } = useGetDetailsMovies();

  const { theme } = useTheme();

  if (!movieDetails && loading) {
    return ReactDOM.createPortal(
      <div className="modal-overlay d-flex justify-content-center align-items-center ">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>,
      document.getElementById("root-movieDetails")!
    );
  }

  if (!movieDetails) return null;

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isModalOpen && (
        <div className="modal-overlay d-flex justify-content-center align-items-center">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.5 }}
            className="modal-content w-50 h-50 modalMovieDetailsMobile"
            style={{
              background: theme === "dark" ? "#121212" : "#c7c7c7",
              color: theme === "dark" ? "#333333" : " #e0e0e0",
              zIndex: "999",
              maxWidth: "50%",
              maxHeight: "50vh",
              overflow: "hidden",
            }}
          >
            <div
              className="w-100 h-100 d-flex flex-column flex-md-row gap-5 justify-content-center"
              style={{ padding: "1rem" }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
                alt={movieDetails.title}
                className="img-fluid"
                style={{
                  objectFit: "contain",
                  maxHeight: "100%",
                  maxWidth: "100%",
                  minHeight: "30rem",
                  minWidth: "30rem",
                }}
              />
              <div className="text-center f gap-3 text-md-start">
                <h2 className="text-white fw-semibold">{movieDetails.title}</h2>
                <p className="fs-5 fw-semibold" style={{ color: "#ae8c35" }}>
                  {movieDetails.overview}
                </p>
                <h5 className="text-white fs-4 fw-semibold">Release date:</h5>
                <p className="fs-4 fw-semibold" style={{ color: "#ae8c35" }}>
                  {movieDetails.release_date}
                </p>
                <BtnMovieDetails />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.getElementById("root-movieDetails")!
  );
};

export default MovieDetail;
