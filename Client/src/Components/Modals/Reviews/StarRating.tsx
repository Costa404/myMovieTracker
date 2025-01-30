import { useState } from "react";
import { FaStar } from "react-icons/fa";

interface StarRatingProps {
  rating: number;
  setRating: (rating: number) => void;
}

const StarRating = ({ rating, setRating }: StarRatingProps) => {
  const [hover, setHover] = useState(0);

  const handleClick = (value: number) => {
    setRating(value);
  };

  console.log("rating", rating);

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((value) => (
        <FaStar
          key={value}
          className="star"
          size={30}
          color={value <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
          onClick={() => handleClick(value)}
          onMouseEnter={() => setHover(value)}
          onMouseLeave={() => setHover(0)}
          style={{ cursor: "pointer", marginRight: 5 }}
        />
      ))}
    </div>
  );
};

export default StarRating;
