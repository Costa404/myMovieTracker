import { useState, useEffect } from "react";
import { apiFetch } from "./api";

export const useGetCurrentUser = () => {
  const [getUser, setGetUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    console.log("token", token);

    if (!token) return;

    const getUser = async () => {
      try {
        const response = await apiFetch("/api/currentUser", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error when fetching movies");
        }

        setGetUser(response);
      } catch (error) {
        console.error("Error when fetching movies:", error);
      }
    };

    getUser();
  }, []);
  return getUser;
};
