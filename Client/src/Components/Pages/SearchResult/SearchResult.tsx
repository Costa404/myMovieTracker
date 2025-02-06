import SearchInput from "../../Modals/ModalDisplayMovies/SearchInput";
import MovieList from "../../Modals/ModalDisplayMovies/MovieList";
import { useSearchMovieStore } from "../../Modals/ModalDisplayMovies/useSearchMovieStore";
import { useMovieDetailsStore } from "../../Modals/ModalMovieDetails/useMovieDetailsStore";

const SearchResult = () => {
  const { searchTerm } = useSearchMovieStore();
  const { setMovieId, openMovieDetail } = useMovieDetailsStore();
  const handleMovieClick = (movieId: number) => {
    setMovieId(movieId);
    openMovieDetail();
  };

  return (
    <div className="min-vh-100" style={{ marginTop: "9rem" }}>
      <h5 className="fs-2  fw-bold">
        Search Results for: <span className="fw-semibold">"{searchTerm}"</span>
      </h5>

      <SearchInput />
      <MovieList onMovieClick={handleMovieClick} />
    </div>
  );
};

export default SearchResult;
