import React, { useEffect, useRef } from "react";
import { useChat } from "../context/ChatContext";
import Message from "./Message";
import MessageInput from "./MessageInput";

function ChatWindow() {
  const { state, dispatch } = useChat();
  const chatEndRef = useRef(null);

  const activeChat =
    state.chats.find((chat) => chat.id === state.activeChatId) ||
    state.groups.find((group) => group.id === state.activeChatId);

  const type = state.chats.find((chat) => chat.id === state.activeChatId)
    ? "people"
    : "group";

  const activeChatMessages = activeChat?.messages;

  useEffect(() => {
    if (activeChat && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [activeChat, activeChatMessages]);

  if (!activeChat) {
    return (
      <div className="w-2/3 h-full flex items-center justify-center text-gray-400">
        Select a chat to start messaging
      </div>
    );
  }

  const handleDeleteMessage = (messageId) => {
    dispatch({
      type: "DELETE_MESSAGE",
      payload: { messageId },
    });
  };

  return (
    <div className="w-2/3 h-full flex flex-col">
      <div className="flex justify-between items-center p-4 border-b">
        <div>
          <p className="text-lg font-medium">{activeChat.name}</p>
          {activeChat.members && (
            <p className="text-sm text-green-500">
              ● {activeChat.members.length} member(s)
            </p>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4">
        {activeChat.messages.length > 0 ? (
          activeChat.messages.map((msg, idx) => (
            <Message
              key={idx}
              message={msg}
              onDelete={handleDeleteMessage}
              type={type}
            />
          ))
        ) : (
          <div className="text-center text-gray-400">No messages yet</div>
        )}

        <div ref={chatEndRef} />
      </div>

      <div className="p-4 border-t">
        <MessageInput type={type} />
      </div>
    </div>
  );
}

export default ChatWindow;
