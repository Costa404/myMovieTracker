import { useState } from "react";
import { apiFetch } from "../api";

export const useDeleteWatchlist = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteResponse = async ({ movie_id }: { movie_id: number }) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");

      const response = await apiFetch(`/api/deleteFromWatchlist/${movie_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Delete response:", response);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return { deleteResponse, loading, error };
};
