import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoMdArrowRoundBack } from "react-icons/io";

import { useChatBot } from "./useChatBot";
import { useChatBotStore } from "./useChatBotStore";

const ModalChatbot = () => {
  const { query, setQuery, messages, loading, handleSearch, messagesEndRef } =
    useChatBot();
  const { closeChatBot, isChatBotOpen } = useChatBotStore();

  return ReactDOM.createPortal(
    isChatBotOpen && (
      <section className="overlayDisplayMovieReview modal-overlay d-flex justify-content-center align-content-center">
        <section className="modal-content d-flex justify-content-center align-items-center">
          <div className="card shadow" style={{ width: "32rem" }}>
            {/* Header do Modal */}
            <div className="card-header bg-black text-white text-center fw-bold d-flex justify-content-between align-items-center">
              <h6 className="fw-bold fs-5"> Movie Chatbot 🎬</h6>
              <IoMdArrowRoundBack
                onClick={closeChatBot}
                className=" text-white "
                style={{ fontSize: "3.1rem" }}
              />
            </div>

            {/* Área de Mensagens */}
            <div
              className="card-body overflow-auto"
              style={{ height: "30rem" }}
            >
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`d-flex fs-5 ${
                    msg.sender === "user"
                      ? "justify-content-end"
                      : "justify-content-start"
                  } mb-2`}
                >
                  <div
                    className={`p-2 rounded ${
                      msg.sender === "user"
                        ? "bg-primary text-white"
                        : "bg-light border"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              <div ref={messagesEndRef} />
            </div>

            <div className="card-footer">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control fw-semibold"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Type a message..."
                />
                <button
                  className="btn btn-primary fw-semibold"
                  onClick={handleSearch}
                  disabled={loading}
                >
                  {loading ? "..." : "Send"}
                </button>
              </div>
            </div>
          </div>
        </section>
      </section>
    ),
    document.getElementById("modal-chatBot")!
  );
};

export default ModalChatbot;
