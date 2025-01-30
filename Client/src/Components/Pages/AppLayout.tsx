import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";
import Navbar from "./Navbar/Navbar";

import Login from "../Modals/Auth/Login/Login";
import Signup from "../Modals/Auth/Signup/Signup";
import SidebarMobile from "../Modals/SidebarMobile/SidebarMobile";
import BtnDarkLightMode from "../Utility/BtnDarkLight/BtnDarkLightMode";
import { Suspense } from "react";
import LoadingSpinner from "../Utility/Loading/Loading";
import MovieDetail from "../Modals/MovieDetails";
import { useMovieDetailsStore } from "../Utility/Zustand/useMovieDetailsStore";

const AppLayout = () => {
  const { isModalOpen } = useMovieDetailsStore();
  return (
    <section className="w-100 d-flex flex-column align-items-center">
      <div className="w-75 contentHomepage">
        <Navbar />
        <Suspense fallback={<LoadingSpinner />}>
          <Outlet />
        </Suspense>
        <Footer />
      </div>
      <BtnDarkLightMode />
      {/* ====================

      Modals

      ==================== */}
      <Login />
      <Signup />
      <SidebarMobile />
      {isModalOpen && <MovieDetail />}
    </section>
  );
};

export default AppLayout;
