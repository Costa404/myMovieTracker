import React from "react";
import defaultImgProfile from "../../../../assets/photoPtofileDefault.jpg";
import { motion } from "framer-motion";
import type { MovieReview } from "../../../Utility/Interface/geralInterfaces";

interface MovieReviewProps {
  review: MovieReview;
}

const MovieReview: React.FC<MovieReviewProps> = ({ review }) => {
  const { name, rating, username, avatar_path } = review.author_details;

  return (
    <motion.div
      whileInView={{ opacity: 1, x: 0 }}
      initial={{ opacity: 0, x: -100 }}
      transition={{ duration: 1.5 }}
      className="card mb-4 p-3 rounded-4"
    >
      <div className="d-flex justify-content-between align-items-start">
        <div className="d-flex align-items-center">
          <img
            src={
              avatar_path === null
                ? defaultImgProfile
                : `https://image.tmdb.org/t/p/w500${avatar_path}`
            }
            alt={name}
            style={{
              width: "5rem",
              height: "5rem",
              borderRadius: "50%",
              objectFit: "cover",
              marginRight: "1rem",
            }}
          />
          <div>
            <h5>{name}</h5>
            <p className="text-muted fs-5 fw-bold">@{username}</p>
            <p className="text-muted fs-5">Rating: {rating}</p>
          </div>
        </div>
        <p className="text-muted fs-5">
          {new Date(review.created_at).toLocaleDateString()}
        </p>
      </div>
      <div className="mt-3">
        <p>{review.content}</p>
      </div>
    </motion.div>
  );
};

export default MovieReview;
