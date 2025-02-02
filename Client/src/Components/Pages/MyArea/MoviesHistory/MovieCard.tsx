import React from "react";

interface MovieCardProps {
  movie: {
    movietitle: string;
    moviegenre: number[];
    watched_at: string;
    movieimg: string;
  };
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className="card shadow h-100">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.movieimg}`}
        alt={movie.movietitle}
        className="card-img-top"
        style={{
          height: "auto",
          objectFit: "cover",
          borderRadius: "0.5rem",
        }}
      />
      <div className="card-body">
        <h5 className="card-title">{movie.movietitle}</h5>{" "}
        <p className="card-text">
          Watched on: {new Date(movie.watched_at).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
