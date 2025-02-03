import React from "react";
import { Spinner } from "react-bootstrap";
import { useIsMovieInHistory } from "./useIsMovieInHistory";

interface MoviesHistoryButtonProps {
  movieId: number;
  isOnline: boolean;
  handlePostWatchlist: () => void;
  loading: boolean;
  added: boolean;
  style?: React.CSSProperties;
}

const MoviesHistoryButton: React.FC<MoviesHistoryButtonProps> = ({
  movieId,
  isOnline,
  handlePostWatchlist,
  loading,
  added,
  style,
}) => {
  const { isMovieInHistory, loading: historyLoading } =
    useIsMovieInHistory(movieId);

  if (loading || historyLoading) {
    return (
      <div className="d-flex justify-content-center">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  const defaultStyle: React.CSSProperties = {
    backgroundColor: "#ae8c35",
    border: "none",
    width: "20rem",
    height: "3.5rem",
  };

  return (
    <button
      className="btn fs-4 fw-bold text-white px-4 btnTransform rounded-5"
      style={{ ...defaultStyle, ...style }}
      onClick={handlePostWatchlist}
      disabled={!isOnline || isMovieInHistory || added}
    >
      {added || isMovieInHistory ? "Already watched" : "Mark as watched"}
    </button>
  );
};

export default MoviesHistoryButton;
