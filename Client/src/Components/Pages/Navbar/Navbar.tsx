import { useAuthStore } from "../../Utility/Zustand/useAuthStore";
import { useTheme } from "../../../Context/ThemeContext/ThemeContext";
import { useNavigate } from "react-router-dom";
import { useIsOnline } from "../../Utility/Hooks/useIsOnline";
import { MdLocalMovies } from "react-icons/md";
import { useEffect } from "react";
import { FaBars, FaRegUser } from "react-icons/fa";

import { useSidebarStore } from "../../Utility/Zustand/useSidebarStore";
import { usePageStore } from "../../Utility/Zustand/usePageStore";
const Navbar = () => {
  const { openModalLogin } = useAuthStore();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { isOnline } = useIsOnline();
  const { toggleSidebar } = useSidebarStore();
  const { page, setPage } = usePageStore();

  useEffect(() => {}, [isOnline]);

  const handleNavigation = (path: string, pageName: string) => {
    setPage(pageName);
    navigate(path);
  };

  console.log("ola.");
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
            onClick={() => handleNavigation("/tvshows", "Tv Shows")}
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

          {isOnline ? null : (
            <span>
              <button
                onClick={openModalLogin}
                className="p-2 fw-bold fs-4 px-4 rounded-5 navbarChildMobile btnTransform"
                style={{
                  background: theme === "dark" ? "#c7c7c7" : "#121212",
                  color: theme === "dark" ? "#333333" : " #e0e0e0",
                  border: "none",
                }}
              >
                Login
              </button>
            </span>
          )}
        </div>

        <FaBars onClick={toggleSidebar} className="mx-3 fs-1 faBars hover" />
      </div>
    </section>
  );
};

export default Navbar;
