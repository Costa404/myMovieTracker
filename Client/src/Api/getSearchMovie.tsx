import { useState } from "react";

export const useGetSearchMovie = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    try {
      const response = await fetch(
        `http://localhost:3000/api/movies/search?query=${encodeURIComponent(
          searchTerm
        )}`
      );
      console.log("searchTerm before sending:", searchTerm);

      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error("ErroR searching movies:", error);
    }
  };
  return { movies, setSearchTerm, searchTerm, handleSearch };
};
