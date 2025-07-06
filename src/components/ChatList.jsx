import React, { useEffect, useState } from "react";
import { useChat } from "../context/ChatContext";

function ChatList({ type, searchInput }) {
  const { state, dispatch } = useChat();
  const [displayChats, setDisplayChats] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [chatToDelete, setChatToDelete] = useState(null);

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

  const handleDeleteChat = (e, chat) => {
    e.stopPropagation();
    setChatToDelete(chat);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (chatToDelete) {
      dispatch({ type: "DELETE_CHAT", payload: chatToDelete });
      setShowDeleteModal(false);
      setChatToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setChatToDelete(null);
  };

  return (
    <>
      <div className="flex-1 overflow-auto relative ">
        {displayChats.map((ele) => (
          <div
            key={ele.id}
            onClick={() =>
              dispatch({ type: "SET_ACTIVE_CHAT", payload: ele.id })
            }
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

            <div className="flex flex-col justify-center mt-0.5">
              <div>
                <button
                  className="cursor-pointer p-1 hover:bg-gray-600 rounded"
                  onClick={(e) => handleDeleteChat(e, ele)}
                >
                  <span className="material-symbols-outlined text-gray-400 text-sm">
                    more_vert
                  </span>
                </button>
              </div>
              <p className="text-xs text-gray-400">{ele.lastSeen}</p>
            </div>
          </div>
        ))}
      </div>
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-10">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-red-500 text-xl">
                warning
              </span>
              <h3 className="text-lg font-semibold text-gray-900">
                Delete {chatToDelete?.name}
              </h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this{" "}
              {type === "group" ? "group" : "chat"}? This action cannot be
              undone and all messages will be permanently removed.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatList;
