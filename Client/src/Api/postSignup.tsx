import React, { useState } from "react";
import { useError } from "../Context/ThemeContext/errorContext/useError";

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
      const response = await fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          username,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create account");
      }

      const data = await response.json();
      const { token } = data;

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
