import React from "react";
import { Movie } from "../../Utility/Interface/geralInterfaces";

interface SelectedMovieProps {
  selectedMovie: Movie;
}

const SelectedMovie: React.FC<SelectedMovieProps> = ({ selectedMovie }) => {
  return (
    <div
      className="selected-movie d-flex flex-column align-items-center justify-content-center"
      style={{
        minHeight: "20rem",
        width: "100%",
      }}
    >
      <img
        src={`https://image.tmdb.org/t/p/w92${selectedMovie.poster_path}`}
        alt={selectedMovie.title}
        style={{
          height: "15rem",
          marginBottom: "10px",
          borderRadius: "5px",
        }}
      />
      <p className="fs-5 fw-bold">{selectedMovie.title}</p>
    </div>
  );
};

export default SelectedMovie;
