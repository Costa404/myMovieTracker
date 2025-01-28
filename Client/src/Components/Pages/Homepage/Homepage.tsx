import "bootstrap/dist/css/bootstrap.min.css";
import { useMovieDetailsStore } from "../../Utility/Zustand/useMovieDetailsStore";
import Navbar from "../Navbar/Navbar";

import MoviesByGenre from "./HomepageSubComponents/MoviesByGenre";
import MovieDetail from "../../Modals/MovieDetails";
import BtnDarkLightMode from "../../Utility/BtnDarkLight/BtnDarkLightMode";
import Footer from "../Footer/Footer";
import Login from "../Auth/Login/Login";
import Signup from "../Auth/Signup/Signup";
import PopularMovies from "./PopularMovies/PopularMovies";
import { useGetReviews } from "../../../Api/getReviewsMovies";

const Homepage = () => {
  const { isModalOpen } = useMovieDetailsStore();
  const { reviews } = useGetReviews();

  console.log("reviews", reviews);

  return (
    <section className="w-100 d-flex flex-column align-items-center">
      <Navbar />
      <div className="w-75 contentHomepage" style={{ marginTop: "10rem" }}>
        <PopularMovies />
        <MoviesByGenre />
      </div>
      {isModalOpen && <MovieDetail />}
      <BtnDarkLightMode />
      <Footer />
      <Login />
      <Signup />
    </section>
  );
};

export default Homepage;
