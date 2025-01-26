import { useState, useEffect } from "react";

export const useGetCurrentUser = () => {
  const [getUser, setGetUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    console.log("token", token);

    if (!token) return;

    const getUser = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/currentUser", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error when fetching movies");
        }

        const userData = await response.json();
        console.log("userData", userData);
        setGetUser(userData);
      } catch (error) {
        console.error("Error when fetching movies:", error);
      }
    };

    getUser();
  }, []);
  return getUser;
};
