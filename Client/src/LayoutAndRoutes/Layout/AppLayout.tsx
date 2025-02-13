import { Outlet } from "react-router-dom";
import Footer from "../../Components/Pages/Footer/Footer";
import Navbar from "../../Components/Pages/Navbar/Navbar";
import Login from "../../Components/Modals/Auth/Login/Login";
import Signup from "../../Components/Modals/Auth/Signup/Signup";
import SidebarMobile from "../../Components/Modals/SidebarMobile/SidebarMobile";
import { Suspense } from "react";
import LoadingSpinner from "../../Components/Utility/Loading/Loading";

import BtnDarkLightMode from "../../Components/Utility/Hooks/BtnDarkLight/BtnDarkLightMode";
import ModalReviews from "../../Components/Modals/SubmitReview/ModalReviews";
import ModalDisplayMovies from "../../Components/Modals/ModalDisplayMovies/ModalDisplayMovies";
import ModalRecommendedMovies from "../../Components/Modals/ModalMovieDetails/ModalRecommendedMovies/ModalRecommendedMovies";

import ModalChatbot from "../../Components/Modals/ModalChatbot/ModalChatbot";
import ModalChatList from "../../Components/Modals/ModalChatbot/ModalChatList";
import ChatBotIcon from "../../Components/Utility/Hooks/ChatBotIcon";

const AppLayout = () => {
  return (
    <section className="w-100 d-flex flex-column align-items-center">
      <div className="w-75 contentHomepage  ">
        <Navbar />

        <Suspense fallback={<LoadingSpinner />}>
          <Outlet />
        </Suspense>
        <Footer />
      </div>
      {/* ====================

Modals

==================== */}
      <ModalChatList />
      <ModalChatbot />
      <ChatBotIcon />
      <BtnDarkLightMode />
      <Login />
      <Signup />
      <SidebarMobile />

      <ModalReviews />
      <ModalDisplayMovies />
      <ModalRecommendedMovies />
    </section>
  );
};

export default AppLayout;
