import { useState, useEffect } from "react";
import LoadingSpinner from "../../../Utility/Loading/Loading";
import { useMovieDetailsStore } from "../../../Utility/Zustand/useMovieDetailsStore";
import { useGetMovies } from "../../../../Api/getMovies";

const PopularMovies = () => {
  const { setMovieId, openModal } = useMovieDetailsStore();

  const { popularMovies } = useGetMovies();

  const handleMovieClick = (movieId: string) => {
    setMovieId(movieId);
    openModal();
  };

  console.log(handleMovieClick);

  const isLoading = !popularMovies || popularMovies.length === 0;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % popularMovies.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [popularMovies.length]);

  const getVisibleMovies = () => {
    const totalMovies = popularMovies.length;
    const prevIndex = (activeIndex - 1 + totalMovies) % totalMovies;
    const nextIndex = (activeIndex + 1) % totalMovies;

    return [
      popularMovies[prevIndex],
      popularMovies[activeIndex],
      popularMovies[nextIndex],
    ];
  };

  const visibleMovies = getVisibleMovies();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="mb-4 ">
      <h2 className="">Popular Movies</h2>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ overflow: "hidden" }}
      >
        <div
          className="carousel-movie"
          style={{
            width: "200px",
            height: "300px",
            margin: "0 10px",
            transition: "transform 0.5s ease",
          }}
        >
          <img
            src={`https://image.tmdb.org/t/p/w500${visibleMovies[0].poster_path}`}
            alt={visibleMovies[0].title}
            className="img-fluid"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>

        <div
          className="carousel-movie center"
          style={{
            width: "300px",
            height: "400px",
            margin: "0 10px",
            transition: "transform 0.5s ease",
            transform: "scale(1)",
          }}
        >
          <img
            src={`https://image.tmdb.org/t/p/w500${visibleMovies[1].poster_path}`}
            alt={visibleMovies[1].title}
            className="img-fluid"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>

        <div
          className="carousel-movie"
          style={{
            width: "200px",
            height: "300px",
            margin: "0 10px",
            transition: "transform 0.5s ease",
          }}
        >
          <img
            src={`https://image.tmdb.org/t/p/w500${visibleMovies[2].poster_path}`}
            alt={visibleMovies[2].title}
            className="img-fluid"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PopularMovies;
