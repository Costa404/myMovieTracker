import { useState } from "react";
import { apiFetch } from "../api";

export const usePostFriendship = () => {
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddFriend = async (userId: string, friendId: string) => {
    setLoading(true);
    try {
      const response = await apiFetch("/api/friendship", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: userId, friend_id: friendId }),
      });
      console.log("response", response);
      setAdded(true);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    added,
    handleAddFriend,
  };
};
