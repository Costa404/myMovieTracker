import React, { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { genreMapping } from "../../../../StaticContent/genreMapping ";
import { motion } from "framer-motion";
import { Movie } from "../../../Utility/Interface/geralInterfaces";

interface DisplayMoviesScrollProps {
  genre: number;
  movies: Movie[];
  onMovieClick: (movieName: string, movieId: number) => void;
}

const DisplayMoviesScroll: React.FC<DisplayMoviesScrollProps> = ({
  genre,
  movies,
  onMovieClick,
}) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <motion.div
      className="mb-4"
      whileInView={{ opacity: 1, x: 0 }}
      initial={{ opacity: 0, x: -100 }}
      transition={{ duration: 1.5 }}
      style={{ overflowY: "auto" }}
    >
      <h2 className="fw-semibold">{genreMapping[genre]}</h2>{" "}
      <div className="position-relative ">
        <button className="scroll-btn btn left fs-1" onClick={scrollLeft}>
          <FaChevronLeft />
        </button>
        <div
          ref={scrollRef}
          className="d-flex flex-row  pb-2 gap-2  overflow-hidden"
          style={{
            scrollBehavior: "smooth",
            scrollbarWidth: "none",
            overflowX: "scroll",
          }}
        >
          {movies.map((movie) => (
            <div
              key={movie.movie_id}
              className="me-3 hover "
              onClick={() => onMovieClick(movie.title, movie.movie_id)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="card-img-top img-fluid movie-card"
                style={{
                  minWidth: "20rem",
                  maxWidth: "20rem",
                }}
              />
            </div>
          ))}
        </div>
        <button className="scroll-btn btn right fs-1" onClick={scrollRight}>
          <FaChevronRight />
        </button>
      </div>
    </motion.div>
  );
};

export default DisplayMoviesScroll;
