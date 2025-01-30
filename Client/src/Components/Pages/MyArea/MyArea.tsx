import { useCurrentUser } from "../../../Context/useCurrentUserAuth";
import { useIsOnline } from "../../Utility/Hooks/useIsOnline";
import Watchlist from "./Watchlist/Watchlist";

const MyArea = () => {
  const { currentUser } = useCurrentUser();
  const { handleLogout } = useIsOnline();

  return (
    <div
      style={{ minHeight: "100vh" }}
      className="d-flex justify-content-center"
    >
      <div className="container" style={{ paddingTop: "5rem" }}>
        <h1 className="text-center mb-4">Welcome, {currentUser?.username}!</h1>
        <h2 className="mb-4 text-center">My Watchlist</h2>
        <Watchlist />
        <div className="text-center mt-4">
          <button
            onClick={handleLogout}
            className="p-2 fw-bold btn btn-danger fs-4 px-4 rounded-5 btnTransform"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyArea;
