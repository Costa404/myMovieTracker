import { useCallback } from "react";
import { ApiErrorResponse } from "../../../Components/Utility/Interface/InterfaceError";
import { apiFetch } from "../api";

export const useGetWatchlist = () => {
  const handleGetWatchlist =
    useCallback(async (): Promise<ApiErrorResponse | null> => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await apiFetch("/api/watchlist", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        return response;
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Error fetching watchlist:", error.message);
          throw error;
        } else {
          throw new Error("An unknown error occurred");
        }
      }
    }, []);

  return { handleGetWatchlist };
};
