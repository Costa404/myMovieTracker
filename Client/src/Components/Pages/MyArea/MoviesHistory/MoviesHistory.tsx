import { useEffect, useState } from "react";
import { useGetMoviesHistory } from "../../../../Api/get/getMoviesHistory";
import LoadingSpinner from "../../../Utility/Loading/Loading";
import MovieCard from "./MovieCard";
import { useWatchlistLogic } from "../Watchlist/useWatchlistLogic";

const HistoryMovie = () => {
  const { isUnauthorized } = useWatchlistLogic();
  const { handleGetMoviesHistory } = useGetMoviesHistory();
  const [moviesHistory, setMoviesHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const response = await handleGetMoviesHistory();
        if (response && !response.error) {
          setMoviesHistory(response);
        } else {
          setError("Failed to load movies history.");
        }
      } catch (err) {
        console.error("Error:", err);
        setError("Error fetching movie history.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [handleGetMoviesHistory]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center min-vh-100">
        <LoadingSpinner />
      </div>
    );
  }

  if (isUnauthorized) {
    return (
      <p
        className="text-center text-danger min-vh-100"
        style={{ fontSize: "1.2rem" }}
      >
        You must be logged in to view your movie History.
      </p>
    );
  }

  if (error) {
    return <p>error moviesHistory</p>;
  }

  if (moviesHistory.length === 0) {
    return (
      <p
        className="text-center text-muted min-vh-100"
        style={{ fontSize: "1.2rem" }}
      >
        You haven't watched any movies yet.
      </p>
    );
  }

  return (
    <section className="min-vh-100">
      <div className="row">
        {moviesHistory.map((movie, index) => (
          <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-5">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default HistoryMovie;
