/* eslint-disable react-hooks/exhaustive-deps */
import { useGetMoviesHistory } from "../../../../Api/get/getMoviesHistory";
import { useState, useEffect } from "react";
import { Movie } from "../../../Utility/Interface/geralInterfaces";

export const useIsMovieInHistory = (movieId: number) => {
  const [isMovieInHistory, setIsMovieInHistory] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { handleGetMoviesHistory } = useGetMoviesHistory();

  // console.log("movieId recebido:", movieId);

  const checkIfMovieInHistory = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await handleGetMoviesHistory();
      // console.log("Resposta da API:", response);

      if (Array.isArray(response) && response.length > 0) {
        const movieFound = response.some(
          (movie: Movie) => Number(movie.id) === movieId
        );

        console.log("Filme encontrado?", movieFound);
        setIsMovieInHistory(movieFound);
      } else {
        setIsMovieInHistory(false);
      }
    } catch (error) {
      console.error("Erro ao verificar se o filme está no histórico", error);
      setError("Erro ao verificar se o filme está no histórico.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Executando useEffect...");
    checkIfMovieInHistory();
  }, [movieId]);

  useEffect(() => {
    console.log("isMovieInHistory atualizado:", isMovieInHistory);
  }, [isMovieInHistory]);

  return { isMovieInHistory, loading, error };
};
