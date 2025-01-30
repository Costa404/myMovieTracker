import { useEffect, useState } from "react";

export const useIsOnline = () => {
  const [isOnline, setIsOnline] = useState(!!localStorage.getItem("authToken"));
  const [isUnauthorized, setIsUnauthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setIsOnline(false);
      setIsUnauthorized(true);
    } else {
      setIsOnline(true);
      setIsUnauthorized(false);
    }
  }, [localStorage.getItem("authToken")]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsOnline(false);
    setIsUnauthorized(true);
    console.log("Token removed from localStorage:", localStorage);
  };

  return { isOnline, isUnauthorized, handleLogout };
};
