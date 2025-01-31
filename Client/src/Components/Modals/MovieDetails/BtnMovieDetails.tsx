import { useIsOnline } from "../../Utility/Hooks/useIsOnline";
import { useHandlePostWatchlist } from "../../../Api/post/postWatchlist";

import { useMovieDetailsStore } from "./useMovieDetailsStore";
import WatchlistButton from "../../Pages/MyArea/Watchlist/WatchlistButton";
import ActionButton from "../../Utility/ActionButton";

const BtnMovieDetails = () => {
  const { closeModal, clearMovie, movieId } = useMovieDetailsStore();
  const { isOnline } = useIsOnline();
  const { handlePostWatchlist } = useHandlePostWatchlist();

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
          movieId={movieId ? parseInt(movieId) : 0}
          isOnline={isOnline}
          handlePostWatchlist={handlePostWatchlist}
        />
      )}

      <ActionButton
        onClick={handleClose}
        label="close"
        className=" p-2 fw-bold btn-primary btn fs-4 px-4 rounded-5 btnTransform"
        style={{ width: "20rem" }}
      />
    </div>
  );
};

export default BtnMovieDetails;
