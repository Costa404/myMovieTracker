// usePopularMovies.js
import { useState, useEffect } from "react";
import { useGetMovies } from "../../../../Api/get/getMovies";

export const usePopularMovies = () => {
  const { popularMovies } = useGetMovies();
  const isLoading = !popularMovies || popularMovies.length === 0;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % popularMovies.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [popularMovies.length]);

  const getVisibleMovies = () => {
    const totalMovies = popularMovies.length;
    const prevPrevIndex = (activeIndex - 2 + totalMovies) % totalMovies;
    const prevIndex = (activeIndex - 1 + totalMovies) % totalMovies;
    const nextIndex = (activeIndex + 1) % totalMovies;
    const nextNextIndex = (activeIndex + 2) % totalMovies;

    return [
      popularMovies[prevPrevIndex], // Extrema esquerda
      popularMovies[prevIndex], // Esquerda
      popularMovies[activeIndex], // Centro (destaque)
      popularMovies[nextIndex], // Direita
      popularMovies[nextNextIndex], // Extrema direita
    ];
  };

  return {
    getVisibleMovies,
    isLoading,
  };
};
