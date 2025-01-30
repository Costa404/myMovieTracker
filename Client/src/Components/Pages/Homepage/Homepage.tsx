import "bootstrap/dist/css/bootstrap.min.css";
import MoviesByGenre from "./HomepageSubComponents/MoviesByGenre";
import PopularMovies from "./PopularMovies/PopularMovies";

const Homepage = () => {
  return (
    <section className="w-100 d-flex flex-column align-items-center">
      <div className="w-75 contentHomepage" style={{ marginTop: "10rem" }}>
        <PopularMovies />
        <MoviesByGenre />
      </div>
    </section>
  );
};

export default Homepage;
