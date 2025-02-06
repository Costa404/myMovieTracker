import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { useGetCurrentUser } from "../Api/ApiNode/get/getCurrentUser ";

interface DecodedToken {
  username: string;
  email: string;
  iat: number;
  exp: number;
}

interface CurrentUserContextType {
  currentUser: DecodedToken | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<DecodedToken | null>>;
}

const currentUserContext = createContext<CurrentUserContextType | undefined>(
  undefined
);

interface CurrentUserProviderProps {
  children: ReactNode;
}
export const CurrentUserProvider: React.FC<CurrentUserProviderProps> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<DecodedToken | null>(null);
  const fetchedUser = useGetCurrentUser();

  useEffect(() => {
    if (fetchedUser) {
      setCurrentUser(fetchedUser);
      console.log("Current user updated:", fetchedUser);
    }
  }, [fetchedUser]);
  console.log(currentUser);
  return (
    <currentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </currentUserContext.Provider>
  );
};

export const useCurrentUser = (): CurrentUserContextType => {
  const context = useContext(currentUserContext);
  if (!context) {
    throw new Error("You are not authenticated ");
  }
  return context;
};
