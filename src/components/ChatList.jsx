import React, { useEffect, useState } from "react";
import { useChat } from "../context/ChatContext";

function ChatList({ type, searchInput }) {
  const { state, dispatch } = useChat();
  const [displayChats, setDisplayChats] = useState([]);

  useEffect(() => {
    let allChats = [];

    if (type === "group") allChats = [...state.groups];
    else if (type === "people") allChats = [...state.chats];
    else allChats = [...state.chats, ...state.groups];

    if (searchInput && searchInput.trim() !== "") {
      const searchTerm = searchInput.toLowerCase().trim();
      const filteredChats = allChats.filter((chat) =>
        chat.name.toLowerCase().includes(searchTerm)
      );
      setDisplayChats(filteredChats);
    } else {
      setDisplayChats(allChats);
    }
  }, [type, state.groups, state.chats, searchInput]);

  return (
    <div className="flex-1 overflow-auto  ">
      {displayChats.map((ele) => (
        <div
          key={ele.id}
          onClick={() => dispatch({ type: "SET_ACTIVE_CHAT", payload: ele.id })}
          className={`flex items-center justify-between p-3 cursor-pointer border-b hover:bg-[#2a3942] ${
            state.activeChatId === ele.id ? "bg-[#2a3942]" : ""
          }`}
        >
          <div className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold ${ele.avatarColor}`}
            >
              {ele.name
                .split(" ")
                .map((word) => word[0])
                .join("")
                .substring(0, 2)}
            </div>
            <div className="ml-3">
              <p className="font-medium text-sm">{ele.name}</p>
              <p className="text-xs text-gray-400 truncate max-w-[180px]">
                {ele.lastMessage}
              </p>
            </div>
          </div>

          <p className="text-xs text-gray-400">{ele.lastSeen}</p>
        </div>
      ))}
    </div>
  );
}

export default ChatList;
