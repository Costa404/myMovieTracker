import { useEffect, useState } from "react";

export const useIsOnline = () => {
  const [isOnline, setIsOnline] = useState(!!localStorage.getItem("authToken"));

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsOnline(!!token);
    console.log("aquiiiiiiiiiii");
  }, [[localStorage.getItem("authToken")]]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsOnline(false);
    console.log("Token removed from localStorage:", localStorage);
  };

  return { isOnline, handleLogout };
};
