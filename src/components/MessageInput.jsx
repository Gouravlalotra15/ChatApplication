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
        timestamp: new Date().toLocaleTimeString(),
      };

      dispatch({
        type: "SEND_MESSAGE",
        payload: messagePayload,
      });
      setText("");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Type a message"
        className="flex-1 border p-2 rounded-md"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSend();
        }}
      />
      <button
        onClick={handleSend}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Send
      </button>
    </div>
  );
}

export default MessageInput;
