import { useState } from "react";
import ReactDOM from "react-dom";

import ActionButton from "../../Utility/ActionButton";

import { v4 as uuidv4 } from "uuid";
import { useChatListStore } from "./useChatListStore";
import { useChatBotStore } from "./useChatBotStore";

const ModalChatList = () => {
  const [newChatName, setNewChatName] = useState("");
  const { chats, addChat, isChatListModalOpen, closeChatListModal } =
    useChatListStore();
  const { openChatBot } = useChatBotStore();

  const handleCreateNewChat = () => {
    if (!newChatName.trim()) return;
    const newChat = { id: uuidv4(), name: newChatName };
    addChat(newChat);
    setNewChatName("");
  };

  const handleChatClick = (chatId: string) => {
    console.log("Opening chat with ID:", chatId);

    openChatBot(chatId);
  };

  // console.log("isChatBotOpen", isChatBotOpen);

  return ReactDOM.createPortal(
    isChatListModalOpen && (
      <section
        className="modal-overlay d-flex justify-content-center align-items-center"
        style={{ zIndex: "998" }}
      >
        <section className="modal-content d-flex justify-content-center align-items-center">
          <div className="card shadow" style={{ width: "32rem" }}>
            {/* Header do Modal */}
            <div className="card-header bg-black text-white text-center fw-bold d-flex justify-content-between align-items-center">
              <h6 className="fw-bold fs-5">Welcome, let's talk</h6>
              <ActionButton
                onClick={closeChatListModal}
                label="Close"
                style={{ background: "#dc3545", border: "none" }}
              />
            </div>

            <div
              className="card-body overflow-auto"
              style={{ height: "30rem" }}
            >
              {chats.length === 0 ? (
                <p className="fw-semibold">
                  No chats created. Start a new one!
                </p>
              ) : (
                <ul className="list-group">
                  {chats.map((chat) => (
                    <li
                      key={chat.id}
                      className="list-group-item fw-semibold"
                      onClick={() => handleChatClick(chat.id)}
                    >
                      {chat.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Input e Botão */}
            <div className="card-footer">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control fw-semibold"
                  placeholder="Enter chat name"
                  value={newChatName}
                  onChange={(e) => setNewChatName(e.target.value)}
                />
                <button
                  className="btn btn-primary fw-semibold"
                  onClick={handleCreateNewChat}
                >
                  Create New Chat
                </button>
              </div>
            </div>
          </div>
        </section>
      </section>
    ),
    document.getElementById("modal-chatList")!
  );
};

export default ModalChatList;
