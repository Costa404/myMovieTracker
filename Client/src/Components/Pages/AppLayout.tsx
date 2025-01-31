import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";
import Navbar from "./Navbar/Navbar";
import Login from "../Modals/Auth/Login/Login";
import Signup from "../Modals/Auth/Signup/Signup";
import SidebarMobile from "../Modals/SidebarMobile/SidebarMobile";
import { Suspense } from "react";
import LoadingSpinner from "../Utility/Loading/Loading";
import MovieDetail from "../Modals/MovieDetails/MovieDetails";
import { useMovieDetailsStore } from "../Modals/MovieDetails/useMovieDetailsStore";
import BtnDarkLightMode from "../Utility/Hooks/BtnDarkLight/BtnDarkLightMode";
import ModalReviews from "../Modals/SubmitReview/ModalReviews";
import ModalDisplayMovies from "../Modals/ModalDisplayMovies/ModalDisplayMovies";

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
      <ModalReviews />
      <ModalDisplayMovies />
    </section>
  );
};

export default AppLayout;
