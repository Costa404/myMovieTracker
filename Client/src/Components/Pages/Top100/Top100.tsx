import React, { useState } from "react";
import { useGetMovies } from "../../../Api/ApiNode/get/getMovies";
import LoadingSpinner from "../../Utility/Loading/Loading";
import { genreMapping } from "../../../StaticContent/genreMapping ";
import { motion } from "framer-motion";
import { useMovieDetailsStore } from "../../Modals/ModalMovieDetails/useMovieDetailsStore";
import { useNavigate } from "react-router-dom";

const Top100 = () => {
  const { allMovies, loading } = useGetMovies();
  const [selectedGenre, setSelectedGenre] = useState<string>("all");
  const { setMovieName, setMovieId } = useMovieDetailsStore();

  const navigate = useNavigate();

  const handleMovieClick = (movieName: string, movieId: number) => {
    setMovieName(movieName);

    setMovieId(movieId);
    const movieSlug = movieName.replace(/\s+/g, "-").toLowerCase(); // Usando movieName diretamente

    navigate(`/movie/${movieSlug}`);
  };

  const movies = allMovies || [];

  // Ordenar filmes por fakeImdb (maior para menor)
  const sortedMovies = [...movies].sort(
    (a, b) => (b.fakeImdb || 0) - (a.fakeImdb || 0)
  );

  // Filtrar filmes por categoria
  const filteredMovies =
    selectedGenre === "all"
      ? sortedMovies
      : sortedMovies.filter((movie) => movie.genre.includes(selectedGenre));

  if (loading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="container" style={{ marginTop: "9rem" }}>
      <div className="mb-3">
        <label className="fw-semibold fs-4 mb-2">By category</label>
        <select
          className="form-select"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <option value="all">All Movies</option>
          {Object.entries(genreMapping).map(([id, name]) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div className="row row-cols-1 row-cols-md-6 g-4">
        {filteredMovies.map((movie) => (
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            key={movie.id}
            className="col  "
          >
            <div
              className=" card h-100 hover"
              onClick={() => handleMovieClick(movie.title, movie.id)}
            >
              <div className="card-body text-center">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="card-img-top"
                  style={{ width: "100%", height: "auto" }}
                />
                <strong>
                  {movie.fakeImdb ? movie.fakeImdb.toFixed(1) : "N/A"}
                </strong>
                <h5 className="card-title mt-2">{movie.title}</h5>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Top100;
