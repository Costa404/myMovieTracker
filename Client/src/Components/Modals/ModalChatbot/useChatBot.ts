import { useState, useEffect, useRef } from "react";
import { useGetChatBotResponse } from "../../../Api/ApiPython/getChatBotResponse";

export const useChatBot = () => {
  const [messages, setMessages] = useState<
    { text: string; sender: "user" | "bot" }[]
  >([]);
  const [query, setQuery] = useState("");
  const { loading, response, error, getChatBotResponse } =
    useGetChatBotResponse();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setMessages((prev) => [...prev, { text: query, sender: "user" }]);
    setQuery("");

    await getChatBotResponse(query);
  };

  useEffect(() => {
    if (response) {
      setMessages((prev) => [...prev, { text: response, sender: "bot" }]);
    }

    if (error) {
      setMessages((prev) => [...prev, { text: error, sender: "bot" }]);
    }
  }, [response, error]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return {
    query,
    setQuery,
    messages,
    loading,
    handleSearch,
    messagesEndRef,
  };
};
