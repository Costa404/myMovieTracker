import React, { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { genreMapping } from "../../../../StaticContent/genreMapping ";

interface DisplayMoviesScrollProps {
  genre: number;
  movies: Array<{ id: string; title: string; poster_path: string }>;
  onMovieClick: (movieId: string) => void;
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
    <div className="mb-4">
      <h2 className="fw-semibold">{genreMapping[genre]}</h2>{" "}
      <div className="position-relative">
        <button className="scroll-btn btn left fs-1" onClick={scrollLeft}>
          <FaChevronLeft />
        </button>
        <div
          ref={scrollRef}
          className="d-flex flex-row overflow-auto pb-2"
          style={{
            scrollBehavior: "smooth",
            scrollbarWidth: "none",
            overflowX: "scroll",
          }}
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="me-3 hover"
              onClick={() => onMovieClick(movie.id)}
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
    </div>
  );
};

export default DisplayMoviesScroll;
