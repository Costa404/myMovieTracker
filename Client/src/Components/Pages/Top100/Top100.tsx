import React, { useState } from "react";
import { useGetMovies } from "../../../Api/ApiNode/get/getMovies";
import LoadingSpinner from "../../Utility/Loading/Loading";

const Top100 = () => {
  const { allMovies, loading } = useGetMovies();
  console.log("moviesDETAILS", allMovies);

  const movies = allMovies || [];

  // Ordenar filmes por fakeImdb (maior para menor)
  const sortedMovies = [...movies].sort((a, b) => {
    const fakeImdbA = a.fakeImdb || 0;
    const fakeImdbB = b.fakeImdb || 0;
    return fakeImdbB - fakeImdbA; // Ordenar de maior para menor
  });

  if (loading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="text-center mb-4">Top 100 Filmes</h1>
      <div className="row row-cols-1 row-cols-md-6 g-4">
        {sortedMovies.map((movie) => (
          <div key={movie.id} className="col">
            <div className="card h-100">
              <div className="card-body text-center">
                <div
                  style={{
                    backgroundColor: "#000000",
                    color: "#fff",
                    padding: "5px",
                    borderRadius: "5px",
                    marginBottom: "10px",
                  }}
                >
                  <strong>
                    {movie.fakeImdb ? movie.fakeImdb.toFixed(1) : "N/A"}
                  </strong>
                </div>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="card-img-top"
                  style={{ width: "100%", height: "auto" }}
                />
                <h5 className="card-title mt-2">{movie.title}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Top100;
