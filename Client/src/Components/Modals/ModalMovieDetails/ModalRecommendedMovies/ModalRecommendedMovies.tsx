import ReactDOM from "react-dom";
import { useState } from "react";
import { useGetRecommendMovies } from "../../../../Api/ApiPython/getRecommendMovies";
import { useModalRecommendedMovieStore } from "./useRecommendedMoviesStore";
import ActionButton from "../../../Utility/ActionButton";
import { useTheme } from "../../../../Context/ThemeContext/ThemeContext";
import { motion } from "framer-motion";
import LoadingSpinner from "../../../Utility/Loading/Loading";

const ModalRecommendedMovies = () => {
  const { isModalRecommendedMovieOpen, closeModalRecommendedMovie } =
    useModalRecommendedMovieStore();
  const { recommendedMovies, loadingRecommendations } = useGetRecommendMovies();
  const { theme } = useTheme();

  if (!isModalRecommendedMovieOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay d-flex justify-content-center align-items-center  ">
      <div
        className="modal-content w-50 h-50 overflow-hidden modalMovieDetailsMobile"
        style={{
          background: theme === "dark" ? "#121212" : "#c7c7c7",
          color: theme === "dark" ? "#333333" : "#e0e0e0",
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
              {recommendedMovies.map((movie, index) => (
                <div key={index} className="col-6 col-md-4 col-lg-3 mb-3">
                  <motion.div
                    className="card"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
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
              ))}
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
