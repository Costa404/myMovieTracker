import { useEffect } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { Spinner } from "react-bootstrap";

import { useWatchlistLogic } from "./useWatchlistLogic";
import ActionButton from "../../../Utility/ActionButton";
import { useReviewsModalStore } from "../../../Utility/Zustand/useReviewsModalStore";

const Watchlist = () => {
  const { watchlist, loading, isUnauthorized, handleDelete, fetchWatchlist } =
    useWatchlistLogic();
  const { openReviewModal, isReviewModalOpen } = useReviewsModalStore();
  console.log("test", isReviewModalOpen);

  useEffect(() => {
    fetchWatchlist();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (isUnauthorized) {
    return (
      <p className="text-center text-danger" style={{ fontSize: "1.2rem" }}>
        You must be logged in to view your watchlist.
      </p>
    );
  }

  if (watchlist.length === 0) {
    return (
      <p className="text-center text-muted" style={{ fontSize: "1.2rem" }}>
        Your watchlist is empty.
      </p>
    );
  }

  return (
    <div className="row">
      {watchlist.map((movie, index) => (
        <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-5">
          <div
            className="card cardTransformWatchlist shadow h-100 border-0 gap-3"
            style={{
              borderRadius: "2rem",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="card-img-top img-fluid"
              style={{
                maxHeight: "30rem",
                objectFit: "contain",
                borderTopLeftRadius: "2rem",
                borderTopRightRadius: "2rem",
              }}
            />
            <div
              className="card-body text-center"
              style={{
                backgroundColor: "#fff",
                borderRadius: "0 0 20px 20px",
              }}
            >
              <h5 className="card-title text-truncate">{movie.title}</h5>
              <div className="w-100 d-flex mt-3 justify-content-between align-items-center">
                <ActionButton label="New Review" onClick={openReviewModal} />

                <FaRegTrashCan
                  className="text-danger fs-1 hover btnTransform"
                  onClick={() => handleDelete(movie.id)}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Watchlist;
