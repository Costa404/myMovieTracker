import { useAuthStore } from "../../Modals/Auth/useAuthStore";
import { useTheme } from "../../../Context/ThemeContext/ThemeContext";
import { useNavigate } from "react-router-dom";

import { MdLocalMovies } from "react-icons/md";

import { FaBars, FaRegUser } from "react-icons/fa";

import { useSidebarStore } from "../../Modals/SidebarMobile/useSidebarStore";

import { useIsOnline } from "../../Utility/Hooks/useIsOnline";
import { useWatchlistLogic } from "../MyArea/Watchlist/useWatchlistLogic";
import ActionButton from "../../Utility/ActionButton";
import { usePageStore } from "./usePageStore";

const Navbar = () => {
  const { openModalLogin } = useAuthStore();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { isOnline } = useIsOnline();
  const { toggleSidebar } = useSidebarStore();
  const { page, setPage } = usePageStore();
  const { isUnauthorized } = useWatchlistLogic();

  const { handleLogout } = useIsOnline();

  const handleLogoutAndExit = () => {
    handleLogout();
    navigate("/");
  };

  const handleNavigation = (path: string, pageName: string) => {
    setPage(pageName);
    navigate(path);
  };

  return (
    <section
      className="py-4 w-75 border-bottom border-dark position-fixed navbarMobile"
      style={{
        zIndex: "99",
        backgroundColor: theme === "dark" ? "#121212" : "#c7c7c7",
      }}
    >
      <div className="d-flex justify-content-between align-items-center ">
        <div
          className="d-flex gap-3 align-items-center fs-3 fw-semibold navbarContentMobile"
          style={{ color: theme === "dark" ? "#e0e0e0" : " #333333" }}
        >
          <MdLocalMovies
            onClick={() => handleNavigation("/", "Movies")}
            style={{ fontSize: "5rem" }}
            className="btnTransform hover"
          />
          <a
            onClick={() => handleNavigation("/", "Movies")}
            className={` btnTransform hover navbarChildMobile btnTransform ${
              page === "Movies" ? "active" : ""
            }`}
          >
            Movies
          </a>
          <a
            onClick={() => handleNavigation("/tvShows", "Tv Shows")}
            className={`btnTransform hover navbarChildMobile ${
              page === "Tv Shows" ? "active" : ""
            }`}
          >
            Tv Shows
          </a>
          <a
            onClick={() => handleNavigation("/reviews", "Reviews")}
            className={`btnTransform hover navbarChildMobile ${
              page === "Reviews" ? "active" : ""
            }`}
          >
            Reviews
          </a>
          <a
            onClick={() => handleNavigation("/feed", "Feed")}
            className={`hover btnTransform navbarChildMobile ${
              page === "Feed" ? "active" : ""
            }`}
          >
            Feed
          </a>
        </div>
        <div className=" d-flex gap-3 align-items-center">
          <div className="d-flex gap-3 align-items-center">
            <FaRegUser
              onClick={() => handleNavigation("/myArea", "myArea")}
              className={`btnTransform p-2 fw-semibold navbarChildMobile hover ${
                page === "myArea" ? "active" : ""
              }`}
              style={{ fontSize: "3.2rem" }}
            />
          </div>

          {isOnline ? (
            <button
              onClick={handleLogoutAndExit}
              className="p-2 fw-bold btn btn-danger fs-4 px-4 rounded-5  btnTransform navbarChildMobile"
              disabled={isUnauthorized}
            >
              Logout
            </button>
          ) : (
            <span id="mobileBtnReviews">
              <ActionButton label="Login" onClick={openModalLogin} />
            </span>
          )}
        </div>

        <FaBars onClick={toggleSidebar} className="mx-3 fs-1 faBars hover" />
      </div>
    </section>
  );
};

export default Navbar;
