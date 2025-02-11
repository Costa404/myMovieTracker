import { useState } from "react";

const MovieChatbot = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("http://127.0.0.1:5000/movieChatBot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();
      if (data.suggestion) {
        setResponse(data.suggestion);
      } else {
        setResponse("No response received.");
      }
    } catch (error) {
      setResponse("Error fetching response.");
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", textAlign: "center" }}>
      <h2>Movie Chatbot 🎬</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ask about movies..."
        style={{ width: "80%", padding: "8px", marginBottom: "10px" }}
      />
      <button
        onClick={handleSearch}
        disabled={loading}
        style={{ padding: "8px 12px" }}
      >
        {loading ? "Loading..." : "Ask"}
      </button>

      {response && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            border: "1px solid #ccc",
          }}
        >
          <strong>Chatbot Response:</strong>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default MovieChatbot;
