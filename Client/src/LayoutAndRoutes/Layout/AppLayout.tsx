import { Outlet } from "react-router-dom";
import Footer from "../../Components/Pages/Footer/Footer";
import Navbar from "../../Components/Pages/Navbar/Navbar";
import Login from "../../Components/Modals/Auth/Login/Login";
import Signup from "../../Components/Modals/Auth/Signup/Signup";
import SidebarMobile from "../../Components/Modals/SidebarMobile/SidebarMobile";
import { Suspense } from "react";
import LoadingSpinner from "../../Components/Utility/Loading/Loading";
import MovieDetail from "../../Components/Modals/MovieDetails/MovieDetails";
import { useMovieDetailsStore } from "../../Components/Modals/MovieDetails/useMovieDetailsStore";
import BtnDarkLightMode from "../../Components/Utility/Hooks/BtnDarkLight/BtnDarkLightMode";
import ModalReviews from "../../Components/Modals/SubmitReview/ModalReviews";
import ModalDisplayMovies from "../../Components/Modals/ModalDisplayMovies/ModalDisplayMovies";

const AppLayout = () => {
  const { isModalOpen } = useMovieDetailsStore();
  return (
    <section className="w-100 d-flex flex-column align-items-center">
      <div className="w-75 contentHomepage ">
        <Navbar />
        <Suspense fallback={<LoadingSpinner />}>
          <Outlet />
        </Suspense>
        <Footer />
      </div>
      {/* ====================

Modals

==================== */}
      <BtnDarkLightMode />
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
