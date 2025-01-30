import { useGetFeedContent } from "../../Api/get/getFeedContent";
import LoadingSpinner from "../Utility/Loading/Loading";

const FeedDisplay = () => {
  const { feedContent } = useGetFeedContent();

  console.log("feedContent", feedContent);

  return (
    <div className="container mt-5">
      <div
        className="d-flex flex-column align-items-center"
        style={{ marginTop: "12rem" }}
      >
        {feedContent.length > 0 ? (
          feedContent.map((item) => (
            <div className="col-md-4 col-sm-6 col-12 mb-4" key={item.review_id}>
              <div className="card shadow-sm">
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt={item.moviename}
                  className="card-img-top"
                  style={{ height: "350px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <div className="d-flex align-items-center mb-2">
                    {/* Foto de perfil */}
                    <img
                      src={
                        item.profile_picture || "https://via.placeholder.com/50"
                      } // Se não tiver imagem, mostra o placeholder
                      alt={`${item.review_username}'s profile`}
                      className="rounded-circle me-2"
                      style={{
                        width: "40px",
                        height: "40px",
                        objectFit: "cover",
                      }}
                    />
                    {/* Nome do usuário */}
                    <h6 className="card-subtitle text-muted">
                      Review by: {item.review_username}
                    </h6>
                  </div>
                  <h5 className="card-title">{item.moviename}</h5>
                  <p className="card-text">{item.review}</p>
                  <div className="d-flex justify-content-between">
                    <span className="badge bg-primary">{item.rating} / 10</span>
                    <span className="text-muted">
                      {new Date(item.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </div>
  );
};

export default FeedDisplay;
