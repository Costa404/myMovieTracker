import { useState, useEffect } from "react";

const useMovieGraph = (movieId: number, title: string) => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (movieId && title) {
      const url = `http://127.0.0.1:5000/generate_movie_graph?movie_id=${movieId}&title=${encodeURIComponent(
        title
      )}&timestamp=${Date.now()}`;

      setIsLoading(true);
      setImageUrl(url);

      const img = new Image();
      img.src = url;
      img.onload = () => {
        setIsLoading(false);
      };
      img.onerror = () => {
        setIsLoading(false);
      };
    }
  }, [movieId, title]);

  return { imageUrl, isLoading };
};

export default useMovieGraph;
