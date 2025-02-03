/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { FaRegTrashCan } from "react-icons/fa6";

import { useWatchlistLogic } from "./useWatchlistLogic";
import ActionButton from "../../../Utility/ActionButton";
import { useReviewsModalStore } from "../../../Modals/SubmitReview/useReviewsModalStore";
import LoadingSpinner from "../../../Utility/Loading/Loading";

const Watchlist = () => {
  const { watchlist, loading, isUnauthorized, handleDelete, fetchWatchlist } =
    useWatchlistLogic();
  const { openReviewModal } = useReviewsModalStore();

  useEffect(() => {
    fetchWatchlist();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center min-vh-100">
        <LoadingSpinner />
      </div>
    );
  }

  if (isUnauthorized) {
    return (
      <p className="text-center text-danger min-vh-100 fs-4">
        You must be logged in to view your watchlist.
      </p>
    );
  }

  if (watchlist.length === 0) {
    return (
      <p className="text-center text-muted min-vh-100 fs-4">
        Your watchlist is empty.
      </p>
    );
  }

  return (
    <section className="min-vh-100">
      <div className="row g-4">
        {watchlist.map((movie) => (
          <div key={movie.id} className="col-12 col-sm-6 col-md-3 col-lg-2">
            <div
              className="card shadow h-100 border-0"
              style={{ borderRadius: "1.5rem" }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="card-img-top img-fluid"
                style={{
                  maxHeight: "25rem",
                  objectFit: "contain",
                  borderRadius: "1.5rem 1.5rem 0 0",
                }}
              />
              <div className="card-body text-center p-3">
                <h6 className="card-title text-truncate">{movie.title}</h6>
                <div className="d-flex justify-content-between align-items-center mt-2">
                  <ActionButton label="New Review" onClick={openReviewModal} />
                  <FaRegTrashCan
                    className="text-danger fs-4 hover btnTransform"
                    onClick={() => handleDelete(movie.id)}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Watchlist;
