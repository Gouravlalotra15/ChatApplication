import React, { useEffect } from "react";
import { useChat } from "../context/ChatContext";

function Message({ message, onDelete, type }) {
  const { state } = useChat();

  // Get the current user's name dynamically based on active chat
  const currentUser = state.chats.find(
    (chat) => chat.id === state.activeChatId
  )?.name;

  // Check if the message is from the current user
  const isOwn = message.user === currentUser;

  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
      <div className=" px-3 py-2 bg-gray-100 rounded-md shadow-sm text-sm relative">
        {type === "group" && (
          <span style={{ color: `${message.userColor}` }}>{message.user}</span>
        )}
        <div className="flex gap-4">
          <div className="max-w-2xl">{message.content} </div>
          <div>
            {isOwn && (
              <button
                onClick={() => onDelete(message.id)}
                className="text-xs cursor-pointer"
              >
                <span className=" absolute top-2.5 right-0 material-symbols-outlined">
                  delete
                </span>
              </button>
            )}
          </div>
        </div>
        <p className="text-[10px] text-gray-500 text-right mt-1">
          {message.timestamp}
        </p>
      </div>
    </div>
  );
}

export default Message;
