import React, { useState } from "react";
import { useChat } from "../context/ChatContext";

function MessageInput({ type }) {
  const { state, dispatch } = useChat();
  const [text, setText] = useState("");

  const currentUser = state.chats.find(
    (chat) => chat.id === state.activeChatId
  )?.name;

  const handleSend = () => {
    if (text.trim()) {
      const messagePayload = {
        id: Date.now().toString(),
        type: "text",
        content: text,
        user: type === "anyhting" ? "ou" : currentUser,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      };

      dispatch({
        type: "SEND_MESSAGE",
        payload: messagePayload,
      });
      setText("");
    }
  };

  return (
    <div className="flex items-center bg-[#2b2b3c] rounded-2xl">
      <input
        type="text"
        placeholder="Type a message"
        className="flex-1 bg-[#2a3942] text-white p-3 rounded-2xl outline-none placeholder-[#9fa3b1] mr-2"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSend();
        }}
      />
      <button
        onClick={handleSend}
        className="bg-[#4e9cff] text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Send
      </button>
    </div>
  );
}

export default MessageInput;
