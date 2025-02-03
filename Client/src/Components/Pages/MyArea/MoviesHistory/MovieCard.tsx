import React from "react";

export interface MovieCardProps {
  movie: {
    movietitle: string;
    moviegenre: number[];
    watched_at: string;
    movieimg: string;
  };
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div
      className="card shadow h-100 border-0"
      style={{ borderRadius: "2rem" }}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.movieimg}`}
        alt={movie.movietitle}
        className="card-img-top img-fluid"
        style={{
          height: "25rem",
          objectFit: "contain",
          borderRadius: "1.5rem 1.5rem 0 0",
        }}
      />

      <div className="card-body">
        <h5 className="card-title">{movie.movietitle}</h5>{" "}
        <p className="card-text fs-5 fw-bold">
          Watched on: {new Date(movie.watched_at).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
