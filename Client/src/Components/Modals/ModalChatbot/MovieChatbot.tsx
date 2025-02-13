// // import { useState } from "react";
// // import ReactDOM from "react-dom";
// // import "bootstrap/dist/css/bootstrap.min.css";

// // const MovieChatbot = () => {
// //   const [query, setQuery] = useState("");
// //   const [messages, setMessages] = useState<
// //     { text: string; sender: "user" | "bot" }[]
// //   >([]);
// //   const [loading, setLoading] = useState(false);

// //   const handleSearch = async () => {
// //     if (!query.trim()) return;
// //     setLoading(true);

// //     setMessages((prev) => [...prev, { text: query, sender: "user" }]);
// //     setQuery("");

// //     try {
// //       const res = await fetch("http://127.0.0.1:5000/movieChatBot", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ query }),
// //       });

// //       const data = await res.json();
// //       setMessages((prev) => [
// //         ...prev,
// //         { text: data.suggestion || "No response received.", sender: "bot" },
// //       ]);
// //     } catch (error) {
// //       setMessages((prev) => [
// //         ...prev,
// //         { text: "Error fetching response.", sender: "bot" },
// //       ]);
// //     }

// //     setLoading(false);
// //   };

// //   return ReactDOM.createPortal(
// //     <section className="modal-overlay">
// //       <section className="modal-content">
// //         <div
// //           className="position-fixed bottom-0 end-0 mb-3 me-3"
// //           style={{ width: "320px" }}
// //         >
// //           <div className="card shadow">
// //             {/* Header do Chat */}
// //             <div className="card-header bg-primary text-white text-center fw-bold">
// //               Movie Chatbot 🎬
// //             </div>

// //             {/* Área de Mensagens */}
// //             <div
// //               className="card-body overflow-auto"
// //               style={{ height: "300px" }}
// //             >
// //               {messages.map((msg, index) => (
// //                 <div
// //                   key={index}
// //                   className={`d-flex ${
// //                     msg.sender === "user"
// //                       ? "justify-content-end"
// //                       : "justify-content-start"
// //                   } mb-2`}
// //                 >
// //                   <div
// //                     className={`p-2 rounded ${
// //                       msg.sender === "user"
// //                         ? "bg-primary text-white"
// //                         : "bg-light border"
// //                     }`}
// //                   >
// //                     {msg.text}
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>

// //             {/* Input e Botão */}
// //             <div className="card-footer">
// //               <div className="input-group">
// //                 <input
// //                   type="text"
// //                   className="form-control"
// //                   value={query}
// //                   onChange={(e) => setQuery(e.target.value)}
// //                   placeholder="Type a message..."
// //                 />
// //                 <button
// //                   className="btn btn-primary"
// //                   onClick={handleSearch}
// //                   disabled={loading}
// //                 >
// //                   {loading ? "..." : "Send"}
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </section>
// //     </section>,
// //     document.getElementById("modal-chatBot")!
// //   );
// // };

// // export default MovieChatbot;
// // src/components/Modal.tsx
// // src/pages/MovieChatbot.tsx

// import { useState } from "react";
// import ModalChatbot from "./ModalChatbot";

// const MovieChatbot = () => {
//   const [query, setQuery] = useState("");
//   const [messages, setMessages] = useState<
//     { text: string; sender: "user" | "bot" }[]
//   >([]);
//   const [loading, setLoading] = useState(false);

//   const handleSearch = async () => {
//     if (!query.trim()) return;
//     setLoading(true);
//     setMessages((prev) => [...prev, { text: query, sender: "user" }]);
//     setQuery("");

//     try {
//       const res = await fetch("http://127.0.0.1:5000/movieChatBot", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ query }),
//       });
//       const data = await res.json();
//       setMessages((prev) => [
//         ...prev,
//         { text: data.suggestion || "No response received.", sender: "bot" },
//       ]);
//     } catch (error) {
//       setMessages((prev) => [
//         ...prev,
//         { text: "Error fetching response.", sender: "bot" },
//       ]);
//     }
//     setLoading(false);
//   };

//   return (
//     <ModalChatbot
//       title="Movie Chatbot 🎬"
//       messages={messages}
//       query={query}
//       onSendMessage={setQuery} // Atualiza a query
//       loading={loading}
//       placeholder="Type a message..."
//     />
//   );
// };

// export default MovieChatbot;
