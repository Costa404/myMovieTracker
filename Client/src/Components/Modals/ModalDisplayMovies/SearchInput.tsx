import { FaSearch } from "react-icons/fa";
import { useSearchMovieStore } from "./useSearchMovieStore";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const { searchTerm, setSearchTerm } = useSearchMovieStore();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const navigate = useNavigate();

  return (
    <div className="d-flex gap-3 align-items-center">
      <input
        type="text"
        value={searchTerm}
        className="my-4 rounded-5 w-100 fs-5  fw-semibold p-3"
        onChange={handleSearchChange}
        placeholder="Search Movies"
        style={{
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />
      <FaSearch
        className="fs-1 hover "
        style={{ height: "4rem" }}
        onClick={() => {
          navigate("/search");
        }}
      />
    </div>
  );
};

export default SearchInput;

// import { useSearchMovieStore } from "./useSearchMovieStore";

// const SearchInput = () => {
//   const { searchTerm, setSearchTerm } = useSearchMovieStore();

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(e.target.value);
//   };

//   return (
//     <input
//       type="text"
//       value={searchTerm}
//       className="my-3 rounded-5 w-100 fs-4 fw-semibold p-3"
//       onChange={handleSearchChange}
//       placeholder="Search Movies"
//       style={{
//         borderRadius: "5px",
//         border: "1px solid #ccc",
//       }}
//     />
//   );
// };

// export default SearchInput;
