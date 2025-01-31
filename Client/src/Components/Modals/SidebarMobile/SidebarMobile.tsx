import React from "react";
import ReactDOM from "react-dom";
import { useSidebarStore } from "./useSidebarStore";
// import SearchMovie from "../../Pages/Homepage/HomepageSubComponents/SearchMovie";
import { FaRegUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IoTvSharp } from "react-icons/io5";
import { FaRegStar } from "react-icons/fa";
import { MdLocalMovies } from "react-icons/md";
import SidebarInputs from "./SidebarInputs";
import { useSidebarBehavior } from "./useSidebarBehavior";
import { useWindowSize } from "./useWindowResize";
import { motion } from "framer-motion";
import { useTheme } from "../../../Context/ThemeContext/ThemeContext";

const SidebarMobile: React.FC = () => {
  const { isOpenSidebar, closeSidebar } = useSidebarStore();
  const navigate = useNavigate();
  const { windowSize } = useWindowSize();
  const { theme } = useTheme();

  useSidebarBehavior(isOpenSidebar, closeSidebar, windowSize);

  const handleNavigation = (path: string) => {
    navigate(path);
    closeSidebar();
  };

  return ReactDOM.createPortal(
    isOpenSidebar ? (
      <>
        <div
          className="bg-black position-fixed top-0 left-0 w-100 h-100 opacity-75"
          onClick={closeSidebar}
        />
        <motion.div
          className=" d-flex flex-column justify-content-between px-3 border-start border-top border-dark w-50 h-100 position-fixed"
          style={{
            top: "8rem",
            right: "0",
            zIndex: 1050,
            boxShadow: "2px 0px 5px rgba(0,0,0,0.3)",
            background: theme === "dark" ? "#121212" : "#c7c7c7",
          }}
          initial={{ x: "100%" }}
          animate={{ x: "0%" }}
          exit={{ x: "100%" }}
          transition={{ duration: 2 }}
        >
          <div className="d-flex flex-column fs-3 fw-semibold navbarContentMobile w-100 px-3 pt-3 gap-4">
            <a
              className="d-flex justify-content-between align-items-center hover"
              onClick={() => handleNavigation("/movies")}
            >
              Movies <MdLocalMovies />
            </a>

            <a
              className="d-flex justify-content-between align-items-center hover"
              onClick={() => handleNavigation("/tvshows")}
            >
              Tv Shows <IoTvSharp />
            </a>

            <a
              className="d-flex justify-content-between align-items-center hover"
              onClick={() => handleNavigation("/reviews")}
            >
              Reviews <FaRegStar />
            </a>

            <a
              className="d-flex justify-content-between align-items-center hover"
              onClick={() => handleNavigation("/myArea")}
            >
              myArea <FaRegUser />
            </a>
            <a
              className="d-flex justify-content-between align-items-center hover"
              onClick={() => handleNavigation("/feed")}
            >
              Feed <FaRegUser />
            </a>

            <SidebarInputs />
          </div>
        </motion.div>
      </>
    ) : null,
    document.getElementById("modal-SidebarMobile")!
  );
};

export default SidebarMobile;
