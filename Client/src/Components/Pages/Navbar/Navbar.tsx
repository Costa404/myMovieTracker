import { useAuthStore } from "../../Utility/Zustand/useAuthStore";
import { useTheme } from "../../../Context/ThemeContext/ThemeContext";

import { useNavigate } from "react-router-dom";
import { useIsOnline } from "../../Utility/Hooks/useIsOnline";
import { MdLocalMovies } from "react-icons/md";
import { useEffect } from "react";

import { FaRegUser } from "react-icons/fa";
import SearchMovie from "../Homepage/HomepageSubComponents/SearchMovie";

const Navbar = () => {
  const { openModalSignup, openModalLogin } = useAuthStore();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { isOnline, handleLogout } = useIsOnline();
  useEffect(() => {}, [isOnline]);

  return (
    <section
      className="py-4 w-75 bg-black border-bottom border-dark position-fixed "
      style={{ zIndex: "99" }}
    >
      <div className="d-flex justify-content-between  align-items-center ">
        <div className="d-flex gap-3 align-items-center">
          {" "}
          <MdLocalMovies
            onClick={() => navigate("/")}
            style={{ fontSize: "5rem" }}
            className="hover"
          />
        </div>
        <div className="d-flex gap-5 align-items-center fs-3">
          <a className="hover">Movies</a>
          <a className="hover">Tv Shows</a>
          <a className="hover" onClick={() => navigate("/myArea")}>
            Watchlist
          </a>
          <a className="hover">Favourites</a>
        </div>
        {/* ===============================
          final
          =============================== */}
        <div>
          {isOnline ? (
            <div className="d-flex gap-3 align-items-center">
              <FaRegUser
                onClick={handleLogout}
                className="p-2 fw-semibold     hover"
                style={{ fontSize: "3rem" }}
              />
              <SearchMovie />
            </div>
          ) : (
            <>
              <span>
                <button
                  onClick={openModalLogin}
                  className="p-2 fw-semibold fs-4 btn  "
                  style={{ color: theme === "dark" ? "white" : "black" }}
                >
                  Login
                </button>
              </span>
              <span>
                <button
                  onClick={openModalSignup}
                  className="p-2 fw-semibold fs-4 btn  "
                  style={{ color: theme === "dark" ? "white" : "black" }}
                >
                  Signup
                </button>
              </span>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Navbar;
