import React from "react";
import { Spinner } from "react-bootstrap";
import { useIsMovieInHistory } from "./useIsMovieInHistory";

interface MoviesHistoryButtonProps {
  movieId: number;
  isOnline: boolean;
  handlePostWatchlist: () => void;
}

const MoviesHistoryButton: React.FC<MoviesHistoryButtonProps> = ({
  movieId,
  isOnline,
  handlePostWatchlist,
}) => {
  const { isMovieInHistory, loading } = useIsMovieInHistory(movieId);

  console.log("isMovieInHistory", isMovieInHistory);

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <button
      className="btn fs-4 fw-bold text-white px-4 btnTransform rounded-5 "
      style={{
        backgroundColor: "#ae8c35",
        border: "none",
        width: "20rem",
        height: "3.5rem",
      }}
      onClick={handlePostWatchlist}
      disabled={!isOnline || isMovieInHistory}
    >
      {isMovieInHistory ? "Already watched" : "Mark as watched"}
    </button>
  );
};

export default MoviesHistoryButton;
