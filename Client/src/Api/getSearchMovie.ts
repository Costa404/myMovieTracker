import { useState } from "react";
import { apiFetch } from "./api";

export const useGetSearchMovie = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    try {
      const response = await apiFetch(
        `/api/movies/search?query=${encodeURIComponent(searchTerm)}`
      );
      console.log("searchTerm before sending:", searchTerm);

      setMovies(response);
    } catch (error) {
      console.error("Error searching movies:", error);
    }
  };
  return { movies, setSearchTerm, searchTerm, handleSearch };
};
