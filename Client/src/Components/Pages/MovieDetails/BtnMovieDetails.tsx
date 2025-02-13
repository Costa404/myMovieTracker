import { useIsOnline } from "../../Utility/Hooks/useIsOnline";
import { useHandlePostWatchlist } from "../../../Api/ApiNode/post/postWatchlist";

import WatchlistButton from "../MyArea/Watchlist/WatchlistButton";

import { useMovieDetailsStore } from "../../Modals/ModalMovieDetails/useMovieDetailsStore";
import { useHandlePostMoviesHistory } from "../../../Api/ApiNode/post/postMoviesHistory";
import MoviesHistoryButton from "../MyArea/MoviesHistory/MoviesHistoryButton";
import { useEffect } from "react";
import ActionButton from "../../Utility/ActionButton";
import { useModalRecommendedMovieStore } from "../../Modals/ModalMovieDetails/ModalRecommendedMovies/useRecommendedMoviesStore";
import { useMovieGraphModalStore } from "../../Modals/ModalMovieGraph/useMovieGraphModalStore";

const BtnMovieDetails = () => {
  const { movieId } = useMovieDetailsStore();
  const { isOnline } = useIsOnline();
  const { loading, added, handlePostWatchlist, resetAddedWatchlist } =
    useHandlePostWatchlist();

  const { openModalRecommendedMovie } = useModalRecommendedMovieStore();
  const { openMovieGraphModal } = useMovieGraphModalStore();
  const {
    loading: historyLoading,
    added: historyAdded,
    handlePostMoviesHistory,
    resetAddedMovieHistory,
  } = useHandlePostMoviesHistory();

  useEffect(() => {
    resetAddedWatchlist();
  }, [movieId]);

  useEffect(() => {
    resetAddedMovieHistory();
  }, [movieId]);

  return (
    <div className="d-flex flex-column gap-3 mt-3 ">
      <ActionButton
        label="Recommended movies"
        onClick={openModalRecommendedMovie}
        style={{ maxWidth: "20rem" }}
      />
      <ActionButton
        label="Movie Graph"
        style={{ maxWidth: "20rem" }}
        onClick={openMovieGraphModal}
      />

      {!isOnline ? (
        <p className="fs-4 fw-semibold">
          Please login first to add to your watchlist/MovieHistory.
        </p>
      ) : (
        <>
          <WatchlistButton
            movieId={movieId ? Number(movieId) : 0}
            isOnline={isOnline}
            handlePostWatchlist={handlePostWatchlist}
            loading={loading}
            added={added}
          />
          <MoviesHistoryButton
            movieId={movieId ? Number(movieId) : 0}
            isOnline={isOnline}
            handlePostWatchlist={handlePostMoviesHistory}
            loading={historyLoading}
            added={historyAdded}
          />
        </>
      )}

      {/* <ActionButton
        onClick={handleClose}
        label="Close"
        className="p-2 fw-bold btn fs-4 px-4 rounded-5 btnTransform"
        style={{
          background: "#dc3545",
          border: "none",
          width: "20rem",
          height: "3.5rem",
        }}
      /> */}
    </div>
  );
};

export default BtnMovieDetails;
