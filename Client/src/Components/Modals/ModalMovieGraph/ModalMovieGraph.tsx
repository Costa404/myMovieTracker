import React from "react";
import ReactDOM from "react-dom";
import LoadingSpinner from "../../Utility/Loading/Loading";
import { useMovieGraphModalStore } from "./useMovieGraphModalStore";
import { useTheme } from "../../../Context/ThemeContext/ThemeContext";
import ActionButton from "../../Utility/ActionButton";
import useMovieGraph from "../../../Api/ApiPython/getMovieGraph";

type ModalMovieGraphProps = {
  movieId: number;
  title: string;
};

const ModalMovieGraph: React.FC<ModalMovieGraphProps> = ({
  movieId,
  title,
}) => {
  const { closeMovieGraphModal, isMovieGraphModalOpen } =
    useMovieGraphModalStore();
  const { theme } = useTheme();
  const { imageUrl, isLoading } = useMovieGraph(movieId, title);

  if (!isMovieGraphModalOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="modal-overlay d-flex justify-content-center align-items-center">
      <div
        className="modal-content d-flex justify-content-center align-items-center p-0 h-50"
        style={{
          background: theme === "dark" ? "#121212" : "#c7c7c7",
          color: theme === "dark" ? "white" : " #e0e0e0",
          zIndex: "999",
          width: "80rem",
          position: "relative",
        }}
      >
        <div
          className="d-flex justify-content-between align-items-center w-100 px-3"
          style={{ minHeight: "12%" }}
        >
          <h3>Movie Graph</h3>
          <ActionButton
            label="close"
            className="btn-danger"
            onClick={closeMovieGraphModal}
            style={{ background: "#dc3545", border: "none" }}
          />
        </div>

        <div style={{ height: "88%", width: "100%", position: "relative" }}>
          {isLoading ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "100%", width: "100%" }}
            >
              <LoadingSpinner />
            </div>
          ) : (
            <img
              src={imageUrl}
              alt="Movie Graph"
              style={{
                width: "100%",
                height: "auto",
                borderEndEndRadius: "2rem",
                borderEndStartRadius: "2rem",
              }}
            />
          )}
        </div>
      </div>
    </div>,
    document.getElementById("modal-movieGraph")!
  );
};

export default ModalMovieGraph;
