import { IoSearchSharp } from "react-icons/io5";
import { useGetSearchMovie } from "../../../../Api/getSearchMovie";

const SearchMovie = () => {
  const { searchTerm, setSearchTerm, handleSearch } = useGetSearchMovie();
  console.log("searchTerm antes de enviar:", searchTerm);

  return (
    <section className="position w-100 searchMovieMobile">
      <div className="d-flex justify-content-end gap-2">
        <input
          className=" border rounded-3 fs-3"
          type="text"
          name=""
          id=""
          placeholder="Ex: Dark"
          onChange={(e) => setSearchTerm(e.target.value)}
          // style={{ width: "100%" }}
        />
        <IoSearchSharp className="fs-1 hover " onClick={handleSearch} />

        {/* <ul>
        {Array.isArray(movies) ? (
          movies.map((movie) => <li key={movie.id}>{movie.title}</li>)
          ) : (
            <li>Erro: {movies.error || "Erro downloading  filmes"}</li> 
            )}
            </ul> */}
      </div>
    </section>
  );
};

export default SearchMovie;
