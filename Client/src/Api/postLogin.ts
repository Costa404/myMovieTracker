import React, { useState } from "react";
import { useError } from "../Context/ThemeContext/errorContext/useError";
import { apiFetch } from "./api";

export const usePostLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { setError } = useError();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await apiFetch("/api/login", {
        method: "POST",
        isPublicRoute: true,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();
      const { token } = data;

      localStorage.setItem("authToken", token);

      console.log("Login successful! Token:", token);
    } catch (err: any) {
      console.error("Login failed:", err);
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return { setEmail, setPassword, handleLogin, loading, password, email };
};
