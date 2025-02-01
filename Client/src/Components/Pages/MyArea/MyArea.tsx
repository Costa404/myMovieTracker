import { useCurrentUser } from "../../../Context/useCurrentUserAuth";
import Watchlist from "./Watchlist/Watchlist";
import { useWatchlistLogic } from "./Watchlist/useWatchlistLogic";
import { useEffect } from "react";

const MyArea = () => {
  const { currentUser } = useCurrentUser();

  const { isUnauthorized } = useWatchlistLogic();

  useEffect(() => {}, [isUnauthorized, currentUser]);

  return (
    <div
      style={{ minHeight: "100vh" }}
      className="d-flex justify-content-center"
    >
      <div className="container" style={{ paddingTop: "10rem" }}>
        <h1 className="text-center mb-4">Hi {currentUser?.username}</h1>
        <h2 className="mb-4 text-center">My Watchlist</h2>
        <Watchlist />
      </div>
    </div>
  );
};

export default MyArea;
