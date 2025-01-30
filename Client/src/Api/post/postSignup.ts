import React, { useState } from "react";
import { useError } from "../../Context/ThemeContext/errorContext/useError";
import { apiFetch } from "../api";

export const usePostSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const { setError } = useError();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await apiFetch("/api/signup", {
        method: "POST",
        isPublicRoute: true,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          username,
        }),
      });

      const { token } = response;

      localStorage.setItem("authToken", token);

      console.log("Account created successfully! Token:", token);
    } catch (err: any) {
      console.error("Signup failed:", err);
      setError("Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    setEmail,
    setPassword,
    username,
    setUsername,
    handleSignup,
    loading,
    password,
    email,
  };
};
