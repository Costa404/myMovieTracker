import { useState, useEffect } from "react";
import { apiFetch } from "../api";

export const useGetCurrentUser = () => {
  const [getUser, setGetUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) return;

    const getUser = async () => {
      try {
        const response = await apiFetch("/api/currentUser", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setGetUser(response);
      } catch (error) {
        console.error("Error when fetching currentuser:", error);
      }
    };

    getUser();
  }, []);
  return getUser;
};
