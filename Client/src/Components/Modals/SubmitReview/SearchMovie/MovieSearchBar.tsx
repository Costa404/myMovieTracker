import { useSearchMovieStore } from "../../ModalDisplayMovies/useSearchMovieStore";

const MovieSearchBar = () => {
  const { searchTerm, setSearchTerm } = useSearchMovieStore();

  return (
    <div>
      <input
        type="text"
        className="form-control p-2 fs-5 w-100 "
        placeholder="Buscar filme..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default MovieSearchBar;
