import { useState, useEffect } from "react";
import { useGetWatchlist } from "../../../../Api/ApiNode/get/getWatchlist";
import { useDeleteWatchlist } from "../../../../Api/ApiNode/delete/deleteWatchlist";
import { Movie } from "../../../Utility/Interface/geralInterfaces";
import { useIsOnline } from "../../../Utility/Hooks/useIsOnline";

export const useWatchlistLogic = () => {
  const { handleGetWatchlist } = useGetWatchlist();
  const { deleteResponse } = useDeleteWatchlist();
  const [watchlist, setWatchlist] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const { isOnline, isUnauthorized } = useIsOnline();
  const [localUnauthorized, setLocalUnauthorized] = useState(isUnauthorized);

  useEffect(() => {
    setLocalUnauthorized(isUnauthorized);
  }, [isUnauthorized]);

  const fetchWatchlist = async () => {
    console.log("isOnline~", isOnline);
    if (!isOnline) {
      setLocalUnauthorized(true);
      console.log("isUnauthorized~", localUnauthorized);
      return;
    }

    setLoading(true);
    setLocalUnauthorized(false);

    try {
      const fetchedWatchlist = await handleGetWatchlist();
      setWatchlist(Array.isArray(fetchedWatchlist) ? fetchedWatchlist : []);
    } catch (error) {
      console.error("Error fetching watchlist:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (movieId: number) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this movie from your watchlist? This action is irreversible."
    );
    if (!confirmation) return;

    setLoading(true);
    try {
      await deleteResponse({ movie_id: movieId });
      await fetchWatchlist();
    } catch (error) {
      console.error("Error deleting movie from watchlist:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    watchlist,
    loading,
    isUnauthorized: localUnauthorized,
    handleDelete,
    fetchWatchlist,
  };
};
