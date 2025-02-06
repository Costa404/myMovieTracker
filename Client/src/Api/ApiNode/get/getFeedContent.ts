import { useEffect, useState } from "react";
import { apiFetch } from "../api";

interface Feed {
  review_id: number;
  review_username: string;
  user_username: string;
  movie_id: number;
  poster_path: string;
  moviename: string;
  review: string;
  rating: number;
  created_at: string;
  profile_picture: string;
}

export const useGetFeedContent = () => {
  const [feedContent, setFeedContent] = useState<Feed[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    const getFeedContent = async () => {
      try {
        if (!token) {
          throw new Error("No token found");
        }

        const response = await apiFetch("/api/feedContent", {
          isPublicRoute: false,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Fetched response:", response);
        setFeedContent(response);
      } catch (error) {
        console.error("Error when fetching feed content:", error);
      }
    };

    getFeedContent();
  }, []);

  return { feedContent };
};
