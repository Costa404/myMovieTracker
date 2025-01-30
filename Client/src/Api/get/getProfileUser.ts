import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { apiFetch } from "../api";

export const useGetProfileUser = () => {
  const { username } = useParams();
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!username) return;
      setLoading(true);
      setError(null);

      try {
        const url = `/api/profile/${username}`;
        console.log("Fetching URL:", url);

        const response = await apiFetch(url, {
          isPublicRoute: true,
        });

        console.log("Response data:", response);
        setProfileData(response);
      } catch (error: any) {
        console.error("Error fetching profile:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username]);

  return { profileData, loading, error };
};
