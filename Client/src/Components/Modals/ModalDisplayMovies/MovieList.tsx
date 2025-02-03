// import { useGetMovies } from "../../../Api/get/getMovies";
// import { useSearchMovieStore } from "./useSearchMovieStore";
// import { useSelectedMovieModalStore } from "./useSelectedMovieModalStore";
// import { Movie } from "../../Utility/Interface/geralInterfaces";
// import { useMovieDetailsStore } from "../MovieDetails/useMovieDetailsStore";

// const MovieList = () => {
//   const { allMovies } = useGetMovies();
//   const { searchTerm } = useSearchMovieStore();
//   const { setSelectedMovieId, closeSelectedMovieModal } =
//     useSelectedMovieModalStore();
//   const { setMovieId, openModal } = useMovieDetailsStore();
//   const filteredMovies = allMovies.filter((movie) =>
//     movie.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleMovieClick = (movieId: number) => {
//     setMovieId(movieId);
//     openModal();
//   };

//   const handleSelectMovie = (movie: Movie) => {
//     setSelectedMovieId(movie);
//     closeSelectedMovieModal();
//   };

//   return (
//     <div
//       className="movie-list d-flex flex-wrap gap-3"
//       style={{
//         justifyContent: "space-evenly",
//         marginBottom: "20px",
//       }}
//     >
//       {filteredMovies.length > 0 ? (
//         filteredMovies.map((movie) => (
//           <div
//             key={movie.id}
//             className="movie-item d-flex flex-column align-items-center reviewCard hover py-2 rounded-2 border border-dark cardModalDisplayMovies"
//             style={{
//               flex: "1 1 30%",
//               maxWidth: "33%",
//             }}
//             onClick={() => handleSelectMovie(movie)}
//           >
//             <img
//               src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
//               alt={movie.title}
//               style={{
//                 width: "12rem",
//                 height: "18rem",
//                 marginBottom: "1rem",
//                 borderRadius: "5px",
//               }}
//             />
//             <p className="fs-3  fw-bold">{movie.title}</p>
//           </div>
//         ))
//       ) : (
//         <p>No movie found</p>
//       )}
//     </div>
//   );
// };

// export default MovieList;
import React from "react";
import { Movie } from "../../Utility/Interface/geralInterfaces";
import { useSearchMovieStore } from "./useSearchMovieStore";
import { useGetMovies } from "../../../Api/get/getMovies";

interface MovieListProps {
  onMovieClick?: (movieId: number) => void;
  onSelectMovie?: (movie: Movie) => void;
}

const MovieList: React.FC<MovieListProps> = ({
  onSelectMovie,
  onMovieClick,
}) => {
  const { searchTerm } = useSearchMovieStore();
  const { allMovies } = useGetMovies();

  const filteredMovies = allMovies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClick = (movie: Movie) => {
    if (onSelectMovie) {
      onSelectMovie(movie);
    } else if (onMovieClick) {
      onMovieClick(movie.id);
    }
  };

  return (
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
            className="movie-item d-flex flex-column align-items-center reviewCard hover py-2 rounded-2 cardModalDisplayMovies text-center"
            style={{
              flex: "1 1 30%",
              maxWidth: "33%",
            }}
            onClick={() => handleClick(movie)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
              alt={movie.title}
              style={{
                width: "12rem",
                height: "18rem",
                marginBottom: "1rem",
                borderRadius: "5px",
              }}
            />
            <p className="fs-3 fw-bold">{movie.title}</p>
          </div>
        ))
      ) : (
        <p className="fs-3 fw-bold">No movie found</p>
      )}
    </div>
  );
};

export default MovieList;
