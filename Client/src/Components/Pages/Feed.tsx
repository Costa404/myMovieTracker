import { useGetFeedContent } from "../../Api/get/getFeedContent";
import LoadingSpinner from "../Utility/Loading/Loading";
import { motion } from "framer-motion";
import { useMovieDetailsStore } from "../Modals/MovieDetails/useMovieDetailsStore";

const FeedDisplay = () => {
  const { feedContent } = useGetFeedContent();

  const { setMovieId, openModal } = useMovieDetailsStore();

  const handleMovieClick = (movieId: string) => {
    setMovieId(movieId);
    openModal();
  };

  return (
    <div className="container mt-5">
      <div
        className="d-flex flex-column align-items-center"
        style={{ marginTop: "12rem" }}
      >
        {feedContent.length > 0 ? (
          feedContent.map((item) => (
            <div className="col-md-4 col-sm-6 col-12 mb-4" key={item.review_id}>
              <motion.div
                className="card shadow-sm"
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: -100 }}
                transition={{ duration: 1.5 }}
              >
                <img
                  onClick={() => handleMovieClick(String(item.movie_id))}
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt={item.moviename}
                  className="card-img-top hover"
                  style={{ height: "350px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <div className="d-flex align-items-center mb-2 hover">
                    <img
                      src={
                        item.profile_picture || "https://via.placeholder.com/50"
                      }
                      alt={`${item.review_username}'s profile`}
                      className="rounded-circle me-2"
                      style={{
                        width: "4rem",
                        height: "4rem",
                        objectFit: "cover",
                      }}
                    />

                    <h1 className="card-subtitle text-muted fw-bolder fs-3 ">
                      {item.review_username}
                    </h1>
                  </div>
                  <h5 className="card-title">{item.moviename}</h5>
                  <p className="card-text fs-5 fw-semibold">{item.review}</p>
                  <div className="d-flex justify-content-between">
                    <span className="badge bg-primary fw-semibold fs-4">
                      {item.rating} / 10
                    </span>
                    <span className="text-muted fw-semibold fs-4">
                      {new Date(item.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          ))
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </div>
  );
};

export default FeedDisplay;
