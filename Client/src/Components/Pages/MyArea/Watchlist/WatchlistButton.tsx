import React from "react";
import { Spinner } from "react-bootstrap";
import { useIsMovieInWatchlist } from "./useIsMovieInWatchlist";

interface WatchlistButtonProps {
  movieId: number;
  isOnline: boolean;
  handlePostWatchlist: () => void;
}

const WatchlistButton: React.FC<WatchlistButtonProps> = ({
  movieId,
  isOnline,
  handlePostWatchlist,
}) => {
  const { isInWatchlist, loading } = useIsMovieInWatchlist(movieId);

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
      disabled={!isOnline || isInWatchlist}
    >
      {isInWatchlist ? "Already in Watchlist" : "Add to Watchlist"}
    </button>
  );
};

export default WatchlistButton;
