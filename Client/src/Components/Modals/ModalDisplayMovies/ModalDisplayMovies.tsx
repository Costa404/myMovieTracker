import ReactDOM from "react-dom";
import { useTheme } from "../../../Context/ThemeContext/ThemeContext";
import { useSelectedMovieModalStore } from "./useSelectedMovieModalStore";
import ActionButton from "../../Utility/ActionButton";
import LoadingSpinner from "../../Utility/Loading/Loading";
import { useGetMovies } from "../../../Api/get/getMovies";
import SearchInput from "./SearchInput";
import MovieList from "./MovieList";
import { Movie } from "../../Utility/Interface/geralInterfaces";

const ModalDisplayMovies = () => {
  const { closeSelectedMovieModal, isSelectedMovieOpen, setSelectedMovieId } =
    useSelectedMovieModalStore();
  const { theme } = useTheme();
  const { loading } = useGetMovies();

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovieId(movie);
    closeSelectedMovieModal();
  };

  if (loading) return <LoadingSpinner />;

  return (
    <>
      {isSelectedMovieOpen &&
        ReactDOM.createPortal(
          <div className="modal-overlay overlayDisplayMovieReview d-flex justify-content-center align-items-center">
            <div
              className="modal-content h-50 w-50 modalReviewsMobile"
              style={{
                background: theme === "dark" ? "#121212" : "#c7c7c7",
                color: theme === "dark" ? "#333333" : "#e0e0e0",
                maxHeight: "80vh",
                overflowY: "auto",
              }}
            >
              <ActionButton
                onClick={closeSelectedMovieModal}
                label="Close"
                style={{ background: "#dc3545", border: "none", width: "25%" }}
              />

              <SearchInput />

              <MovieList onSelectMovie={handleSelectMovie} />
            </div>
          </div>,
          document.getElementById("modal-MoviesDisplayReview")!
        )}
    </>
  );
};

export default ModalDisplayMovies;
