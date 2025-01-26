import { useEffect, useState } from "react";
import { useGetDetailsMovies } from "../../../Api/getDetailsMovies";
import { useGetWatchlist } from "../../../Api/getWatchlist";
import { useCurrentUser } from "../../../Context/useCurrentUserAuth";
import Navbar from "../Navbar/Navbar";

const MyArea = () => {
  const { handleGetWatchlist } = useGetWatchlist();
  const { currentUser } = useCurrentUser();
  const { movieDetails } = useGetDetailsMovies();
  const [watchlist, setWatchlist] = useState<any[]>([]);

  useEffect(() => {
    const fetchWatchlist = async () => {
      if (currentUser) {
        const fetchedWatchlist = await handleGetWatchlist();

        // Verificar se a resposta é um array
        if (Array.isArray(fetchedWatchlist)) {
          setWatchlist(fetchedWatchlist);
        } else {
          setWatchlist([]);
        }
      }
    };

    fetchWatchlist();
  }, [currentUser, handleGetWatchlist]);

  console.log(watchlist);

  return (
    <div className="d-flex justify-content-center" style={{ height: "100vh" }}>
      <Navbar />

      <div style={{ marginTop: "10rem" }}>
        {movieDetails?.title && <h1>{movieDetails.title}</h1>}
        <p>{currentUser?.username}</p>

        <h2>My Watchlist</h2>
        {watchlist.length > 0 ? (
          <ul className="d-flex g-5 h-50 w-100">
            {watchlist.map((movie, index) => (
              <li key={index} className="d-flex flex-column">
                {movie.title}

                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  style={{
                    minHeight: "70%",
                    maxHeight: "70%",
                    minWidth: "25%",
                    maxWidth: "25%",
                  }}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p>Your watchlist is empty.</p>
        )}
      </div>
    </div>
  );
};

export default MyArea;
