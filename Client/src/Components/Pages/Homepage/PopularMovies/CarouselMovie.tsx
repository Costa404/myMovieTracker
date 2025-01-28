// src/components/PopularMovies/CarouselMovie.tsx

import React from "react";

interface CarouselMovieProps {
  imgSrc: string;
  altText: string;
  style: React.CSSProperties;
  className?: string;
}

const CarouselMovie: React.FC<CarouselMovieProps> = ({
  imgSrc,
  altText,
  style,
}) => {
  return (
    <div className="carousel-movie" style={style}>
      <img
        src={imgSrc}
        alt={altText}
        className="img-fluid"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
  );
};

export default CarouselMovie;
