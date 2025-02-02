import { useCallback } from "react";
import { apiFetch } from "../api";

export const useGetMoviesHistory = () => {
  const handleGetMoviesHistory = useCallback(async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) return null;

      const response = await apiFetch("/api/moviesHistory", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      return response;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error fetching moviesHistory:", error.message);
        throw error;
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  }, []);

  return { handleGetMoviesHistory };
};
