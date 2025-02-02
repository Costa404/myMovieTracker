import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../../Context/useCurrentUserAuth";
import { useWatchlistLogic } from "./Watchlist/useWatchlistLogic";
import { usePageStoreMyArea } from "../Navbar/usePageStore";

const MyArea = () => {
  const navigate = useNavigate();
  const { currentUser } = useCurrentUser();
  const { isUnauthorized } = useWatchlistLogic();
  const { page, setPage } = usePageStoreMyArea();

  const getClassName = (pageName: string) => {
    return `mb-4 navbarChildMobile text-center hover fw-semibold ${
      page === pageName ? "active" : ""
    }`;
  };

  useEffect(() => {}, [isUnauthorized, currentUser]);

  const handleNavigation = (path: string, pageName: string) => {
    setPage(pageName);
    navigate(path);
  };

  return (
    <div className="container" style={{ paddingTop: "10rem" }}>
      <div className="d-flex justify-content-between">
        <h2
          className={getClassName("Watchlist")}
          onClick={() => handleNavigation("/myArea/watchlist", "Watchlist")}
        >
          My Watchlist
        </h2>
        <h2
          className={getClassName("Favourites")}
          onClick={() =>
            handleNavigation("/myArea/favouriteMovies", "Favourites")
          }
        >
          Favourites
        </h2>
        <h2
          className={getClassName("History")}
          onClick={() => handleNavigation("/myArea/moviesHistory", "History")}
        >
          History
        </h2>
      </div>
    </div>
  );
};

export default MyArea;
