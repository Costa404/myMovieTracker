import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../../Context/useCurrentUserAuth";
import { useWatchlistLogic } from "./Watchlist/useWatchlistLogic";

const MyArea = () => {
  const navigate = useNavigate(); // Hook de navegação
  const { currentUser } = useCurrentUser();
  const { isUnauthorized } = useWatchlistLogic();

  useEffect(() => {
    if (isUnauthorized) {
      navigate("/"); // Redireciona para a Home se o usuário não tiver permissão
    }
  }, [isUnauthorized, currentUser, navigate]);

  return (
    <div className="container" style={{ paddingTop: "10rem" }}>
      <div className="d-flex justify-content-between">
        <h2
          className="mb-4 text-center fw-semibold"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/myArea/watchlist")}
        >
          My Watchlist
        </h2>
        <h2
          className="mb-4 text-center fw-semibold"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/myArea/favouriteMovies")}
        >
          Favourites
        </h2>
        <h2
          className="mb-4 text-center fw-semibold"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/myArea/moviesHistory")}
        >
          History
        </h2>
      </div>
    </div>
  );
};

export default MyArea;
