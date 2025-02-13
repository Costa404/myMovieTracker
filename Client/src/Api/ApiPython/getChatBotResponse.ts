import { useState } from "react";

export const useGetChatBotResponse = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const getChatBotResponse = async (query: string) => {
    setLoading(true);
    setError(null); // Limpa o erro anterior
    try {
      const res = await fetch("http://127.0.0.1:5000/movieChatBot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch response");
      }

      const data = await res.json();
      setResponse(data.suggestion || "No response received.");
    } catch (error) {
      setError("Error fetching response.");
      setResponse(""); // Limpa a resposta anterior
    }
    setLoading(false);
  };

  return { loading, response, error, getChatBotResponse };
};
