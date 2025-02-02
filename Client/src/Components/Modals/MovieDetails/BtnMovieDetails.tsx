import { useIsOnline } from "../../Utility/Hooks/useIsOnline";
import { useHandlePostWatchlist } from "../../../Api/post/postWatchlist";

import WatchlistButton from "../../Pages/MyArea/Watchlist/WatchlistButton";
import ActionButton from "../../Utility/ActionButton";
import { useMovieDetailsStore } from "./useMovieDetailsStore";
import { useHandlePostMoviesHistory } from "../../../Api/post/postMoviesHistory";
import MoviesHistoryButton from "../../Pages/MyArea/MoviesHistory/MoviesHistoryButton";

const BtnMovieDetails = () => {
  const { closeModal, clearMovie, movieId } = useMovieDetailsStore();
  const { isOnline } = useIsOnline();
  const { handlePostWatchlist } = useHandlePostWatchlist();
  const { handlePostMoviesHistory } = useHandlePostMoviesHistory();

  const handleClose = () => {
    clearMovie();
    closeModal();
  };

  return (
    <div className="d-flex flex-column gap-3 align-items-center">
      {!isOnline ? (
        <p className="fs-3">Please login first to add to your watchlist.</p>
      ) : (
        <WatchlistButton
          movieId={movieId ? Number(movieId) : 0}
          isOnline={isOnline}
          handlePostWatchlist={handlePostWatchlist}
        />
      )}
      {/* <ActionButton
        label="Mark as Watched"
        onClick={handlePostMoviesHistory}
        style={{ width: "20rem", height: "3.5rem" }}
      /> */}
      <MoviesHistoryButton
        movieId={movieId ? Number(movieId) : 0}
        isOnline={isOnline}
        handlePostWatchlist={handlePostMoviesHistory}
      />
      <ActionButton
        onClick={handleClose}
        label="close"
        className=" p-2 fw-bold  btn fs-4 px-4 rounded-5 btnTransform"
        style={{
          background: "#dc3545",
          border: "none",
          width: "20rem",
          height: "3.5rem",
        }}
      />
    </div>
  );
};

export default BtnMovieDetails;
