import { createContext, useContext, useState, ReactNode } from "react";

interface Movie {
  id: string;
  title: string;
  poster_path: string;
  description: string;
}

interface SelectedMovieContextType {
  selectedMovie: Movie | null;
  setSelectedMovie: (movie: Movie | null) => void;
}

const SelectedMovieContext = createContext<
  SelectedMovieContextType | undefined
>(undefined);

export const SelectedMovieProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  return (
    <SelectedMovieContext.Provider value={{ selectedMovie, setSelectedMovie }}>
      {children}
    </SelectedMovieContext.Provider>
  );
};

export const useSelectedMovie = () => {
  const context = useContext(SelectedMovieContext);
  if (!context)
    throw new Error(
      "useSelectedMovie must be used within a SelectedMovieProvider"
    );
  return context;
};
