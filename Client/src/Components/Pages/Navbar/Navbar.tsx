import { useAuthStore } from "../../Utility/Zustand/useAuthStore";
import { useTheme } from "../../../Context/ThemeContext/ThemeContext";

import { useNavigate } from "react-router-dom";
import { useIsOnline } from "../../Utility/Hooks/useIsOnline";
import { MdLocalMovies } from "react-icons/md";
import { useEffect } from "react";

import { FaRegUser } from "react-icons/fa";
import SearchMovie from "../Homepage/HomepageSubComponents/SearchMovie";

const Navbar = () => {
  const { openModalLogin } = useAuthStore();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { isOnline } = useIsOnline();
  useEffect(() => {}, [isOnline]);

  return (
    <section
      className="py-4 w-75 bg-black border-bottom border-dark position-fixed   navbarMobile"
      style={{ zIndex: "99" }}
    >
      <div className="d-flex justify-content-between  align-items-center ">
        <div className="d-flex gap-3 align-items-center fs-3 fw-semibold">
          {" "}
          <MdLocalMovies
            onClick={() => navigate("/")}
            style={{ fontSize: "5rem" }}
            className="hover"
          />
          <a className="hover">Movies</a>
          <a className="hover">Tv Shows</a>
          <a className="hover" onClick={() => navigate("/reviews")}>
            Reviews
          </a>
          {/* <a className="hover" onClick={() => navigate("/myArea")}>
            Watchlist
          </a>
          <a className="hover">Favourites</a> */}
        </div>
        {/* ===============================
          final
          =============================== */}
        <div className=" d-flex gap-3 align-items-center">
          <div className="d-flex gap-3 align-items-center">
            <FaRegUser
              onClick={() => navigate("/myArea")}
              className="p-2 fw-semibold   hover"
              style={{ fontSize: "3rem" }}
            />
          </div>
          <SearchMovie />
          {isOnline ? null : (
            <>
              <span>
                <button
                  onClick={openModalLogin}
                  className="p-2 fw-semibold fs-3 btn  "
                  style={{ color: theme === "dark" ? "white" : "black" }}
                >
                  Login
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
