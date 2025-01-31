import ReactDOM from "react-dom";
import { useGetMovies } from "../../../Api/get/getMovies";
import {
  useSearchMovieStore,
  useSelectedMovieModalStore,
} from "./useSearchMovieStore";

import { useTheme } from "../../../Context/ThemeContext/ThemeContext";
import ActionButton from "../../Utility/ActionButton";
import { Movie } from "../../Utility/Interface/geralInterfaces";
import LoadingSpinner from "../../Utility/Loading/Loading";

const ModalDisplayMovies = () => {
  const { closeSelectedMovieModal, setSelectedMovieId, isSelectedMovieOpen } =
    useSelectedMovieModalStore();
  const { searchTerm, setSearchTerm } = useSearchMovieStore();
  const { allMovies, loading } = useGetMovies();
  const { theme } = useTheme();

  const filteredMovies = allMovies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

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
              className="modal-content h-50 w-50"
              style={{
                background: theme === "dark" ? "#121212" : "#c7c7c7",
                color: theme === "dark" ? "#333333" : " #e0e0e0",

                maxHeight: "80vh",
                overflowY: "auto",
              }}
            >
              <ActionButton
                onClick={closeSelectedMovieModal}
                label="Close"
                style={{ background: "#dc3545", border: "none", width: "15%" }}
              />

              <input
                type="text"
                value={searchTerm}
                className="my-3 rounded-5 w-100 fs-4 fw-semibold p-3"
                onChange={handleSearchChange}
                placeholder="Search Movies"
                style={{
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />

              <div
                className="movie-list d-flex flex-wrap gap-3"
                style={{
                  justifyContent: "space-evenly",
                  marginBottom: "20px",
                }}
              >
                {filteredMovies.length > 0 ? (
                  filteredMovies.map((movie) => (
                    <div
                      key={movie.id}
                      className="movie-item d-flex flex-column align-items-center reviewCard hover py-2 rounded-2 border border-dark"
                      style={{
                        flex: "1 1 30%",
                        maxWidth: "33%",
                      }}
                      onClick={() => handleSelectMovie(movie)}
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
                        alt={movie.title}
                        style={{
                          width: "120px",
                          height: "180px",
                          marginBottom: "10px",
                          borderRadius: "5px",
                        }}
                      />
                      <p className="fs-3  fw-bold">{movie.title}</p>
                    </div>
                  ))
                ) : (
                  <p>No movie founded</p>
                )}
              </div>
            </div>
          </div>,
          document.getElementById("modal-MoviesDisplay")!
        )}
    </>
  );
};

export default ModalDisplayMovies;
