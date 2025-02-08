// import { useGetDetailsMovies } from "../../../Api/ApiNode/get/getDetailsMovies";
// import { useModalRecommendedMovieStore } from "./ModalRecommendedMovies/useRecommendedMoviesStore";
// import BtnMovieDetails from "../../Pages/MovieDetails/BtnMovieDetails";

// import LoadingSpinner from "../../Utility/Loading/Loading";

// const MovieDetails: React.FC<{ movieId: number }> = ({ movieId }) => {
//   const { movieDetails, loading } = useGetDetailsMovies(movieId);
//   // const { theme } = useTheme();
//   const { openModalRecommendedMovie } = useModalRecommendedMovieStore();

//   if (!movieDetails && loading) {
//     return (
//       <div className="d-flex justify-content-center align-items-center min-vh-100">
//         <LoadingSpinner />
//       </div>
//     );
//   }

//   if (!movieDetails) return null;

//   return (
//     <div className="d-flex justify-content-center align-items-center min-vh-100">
//       <div
//         className="modalMovieDetailsMobile d-flex gap-5 w-100 h-100"
//         style={{ overflow: "hidden", minHeight: "100vh", marginTop: "15rem" }}
//       >
//         <img
//           src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
//           alt={movieDetails.title}
//           className="img-fluid rounded"
//           style={{ maxWidth: "30rem", height: "40rem" }} // Ajustado para um tamanho médio
//         />

//         <div className="col-md-8 text-white text-center text-md-start">
//           <h2 className="fw-semibold">{movieDetails.title}</h2>
//           <p className="fs-5 fw-semibold text-warning">
//             {movieDetails.overview}
//           </p>
//           <h5 className="fs-4 fw-semibold">Release date:</h5>
//           <p className="fs-4 fw-semibold text-warning">
//             {movieDetails.release_date}
//           </p>
//           <h5 className="fs-4 fw-semibold mb-5">
//             {`Recommended movies based on ${movieDetails.title} `}{" "}
//             <a href="#" onClick={openModalRecommendedMovie}>
//               here
//             </a>
//           </h5>

//           <BtnMovieDetails />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MovieDetails;
