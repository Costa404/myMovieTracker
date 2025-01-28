import { useEffect, useState } from "react";
import { useGetWatchlist } from "../../../Api/getWatchlist";
import { useCurrentUser } from "../../../Context/useCurrentUserAuth";
import Navbar from "../Navbar/Navbar";
import { useIsOnline } from "../../Utility/Hooks/useIsOnline";

const MyArea = () => {
  const { handleGetWatchlist } = useGetWatchlist();
  const { currentUser } = useCurrentUser();
  const [watchlist, setWatchlist] = useState<any[]>([]);
  const { handleLogout } = useIsOnline();

  useEffect(() => {
    const fetchWatchlist = async () => {
      if (currentUser) {
        const fetchedWatchlist = await handleGetWatchlist();
        setWatchlist(Array.isArray(fetchedWatchlist) ? fetchedWatchlist : []);
      }
    };

    fetchWatchlist();
  }, [currentUser, handleGetWatchlist]);

  return (
    <div
      style={{ minHeight: "100vh" }}
      className="d-flex justify-content-center"
    >
      <Navbar />

      <div className="container  " style={{ paddingTop: "10rem" }}>
        <h1 className="text-center ">Welcome, {currentUser?.username}!</h1>

        <h2 className="mb-4 text-center">My Watchlist</h2>

        {watchlist.length > 0 ? (
          <div className="row">
            {watchlist.map((movie, index) => (
              <div
                key={index}
                className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
              >
                <div className="card shadow-sm h-100">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="card-img-top img-fluid"
                    style={{
                      maxHeight: "300px",
                      objectFit: "cover",
                    }}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">{movie.title}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted">Your watchlist is empty.</p>
        )}
        <button onClick={handleLogout} className="btn btn-danger p-3 px-5">
          Logout
        </button>
      </div>
    </div>
  );
};

export default MyArea;
