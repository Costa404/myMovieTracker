import ReactDOM from "react-dom";

import { useMovieDetailsStore } from "../Utility/Zustand/useMovieDetailsStore";
import { useTheme } from "../../Context/ThemeContext/ThemeContext";
import { AnimatePresence, motion } from "framer-motion";
import { useHandlePostWatchlist } from "../../Api/postWatchlist";
import { useGetDetailsMovies } from "../../Api/getDetailsMovies";
import { useIsOnline } from "../Utility/Hooks/useIsOnline";

const MovieDetail: React.FC = () => {
  const { isModalOpen, closeModal, clearMovie } = useMovieDetailsStore();
  const { isOnline } = useIsOnline();

  const { handlePostWatchlist } = useHandlePostWatchlist();

  const { movieDetails } = useGetDetailsMovies();

  const handleClose = () => {
    clearMovie();

    closeModal();
  };
  const { theme } = useTheme();

  if (!movieDetails) return null;

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isModalOpen && (
        <div className="modal-overlay d-flex justify-content-center align-items-center ">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.5 }}
            className="modal-content w-50 h-50"
            style={{
              background: theme === "dark" ? "black" : "white",
              color: theme === "dark" ? "white" : "black",
            }}
          >
            <div
              className="w-100 h-100 d-flex gap-5 justify-content-center"
              style={{ padding: "2rem" }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
                alt={movieDetails.title}
                style={{
                  minHeight: "70%",
                  maxHeight: "70%",
                  minWidth: "25%",
                  maxWidth: "25%",
                }}
              />
              <div>
                <h2 className="text-white">{movieDetails.title}</h2>
                <p className="fs-5" style={{ color: "#ae8c35" }}>
                  {movieDetails.overview}
                </p>
                <h5 className="text-white fs-4">Release date:</h5>
                <p className="fs-4" style={{ color: "#ae8c35" }}>
                  {movieDetails.release_date}
                </p>
                <div className="d-flex gap-3">
                  <button
                    className="btn fs-4 fw-semibold px-5"
                    style={{ backgroundColor: "#ae8c35", border: "none" }}
                    onClick={handlePostWatchlist}
                    disabled={!isOnline}
                  >
                    Watchlist
                  </button>
                  <button
                    className="btn fs-4 fw-semibold btn-primary px-5"
                    onClick={handleClose}
                  >
                    Close
                  </button>
                </div>
                {!isOnline && (
                  <p className="mt-5 fs-3">Please login or signup first</p>
                )}
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
// import { useEffect, useState } from "react";
// import ReactDOM from "react-dom";
// import { useMovieDetailsStore } from "../Utility/useMovieDetailsStore";

// type MovieDetails = {
//   title: string;
//   poster_path: string;
//   overview: string;
//   release_date: string;
// };

// const MovieDetail: React.FC = () => {
//   // Pegando os dados da store
//   const { isModalOpen, closeModal, movieId, clearMovie } =
//     useMovieDetailsStore();

//   const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);

//   const handleClose = () => {
//     clearMovie();
//     closeModal();
//   };

//   useEffect(() => {
//     if (movieId) {
//       const fetchMovieDetails = async () => {
//         const response = await fetch(
//           `http://localhost:3000//api/movies/${movieId}`
//         );
//         const data = await response.json();
//         setMovieDetails(data);
//       };

//       fetchMovieDetails();
//     }
//   }, [movieId]);

//   if (!movieDetails) return null;

//   return ReactDOM.createPortal(
//     isModalOpen ? (
//       <div className="modal-overlay d-flex justify-content-center align-items-center">
//         <div
//           className="modal-content w-50 h-50 "
//           style={{ background: "#011526" }}
//         >
//           <div
//             className="w-100 h-100 d-flex gap-5 justify-content-center "
//             style={{ padding: "2rem" }}
//           >
//             {" "}
//             <img
//               src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
//               alt={movieDetails.title}
//               style={{
//                 minHeight: "70%",
//                 maxHeight: "70%",
//                 minWidth: "25%",
//                 maxWidth: "25%",
//               }}
//             />
//             <div>
//               {" "}
//               <h2 className="text-white">{movieDetails.title}</h2>
//               <p className=" fs-5" style={{ color: "#ae8c35" }}>
//                 {movieDetails.overview}
//               </p>
//               <span className="fs-5">
//                 <h5
//                   className="
//             text-white"
//                 >
//                   {" "}
//                   Release date:
//                 </h5>
//                 <p style={{ color: "#ae8c35" }}> {movieDetails.release_date}</p>
//               </span>
//               <span>
//                 <button
//                   className="btn fs-4 fw-semibold btn-primary px-5"
//                   onClick={handleClose}
//                 >
//                   Close
//                 </button>
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     ) : null,
//     document.getElementById("root-movieDetails")!
//   );
// };

// export default MovieDetail;
