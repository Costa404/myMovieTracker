import { useState } from "react";
import { useGetWatchlist } from "../../../../Api/get/getWatchlist";
import { useDeleteWatchlist } from "../../../../Api/delete/deleteWatchlist";
import { useCurrentUser } from "../../../../Context/useCurrentUserAuth";
import { Movie } from "../../../Utility/Interface/geralInterfaces";

export const useWatchlistLogic = () => {
  const { handleGetWatchlist } = useGetWatchlist();
  const { deleteResponse } = useDeleteWatchlist();
  const [watchlist, setWatchlist] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useCurrentUser();

  const fetchWatchlist = async () => {
    if (currentUser) {
      setLoading(true);
      try {
        const fetchedWatchlist = await handleGetWatchlist();
        setWatchlist(Array.isArray(fetchedWatchlist) ? fetchedWatchlist : []);
      } catch (error) {
        console.error("Erro ao obter a watchlist", error);
      } finally {
        setLoading(false);
      }
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
      console.error("Erro ao excluir filme da watchlist", error);
    } finally {
      setLoading(false);
    }
  };

  return { watchlist, loading, handleDelete, fetchWatchlist };
};
