import { TiMessages } from "react-icons/ti";
import { useChatListStore } from "../../Modals/ModalChatbot/useChatListStore";

const ChatBotIcon = () => {
  const { openChatListModal } = useChatListStore();

  return (
    <div className="position-fixed px-3 " style={{ bottom: "50%", right: "0" }}>
      <button onClick={openChatListModal} className="btn text-white fs-1 ">
        <TiMessages />
      </button>
    </div>
  );
};

export default ChatBotIcon;
