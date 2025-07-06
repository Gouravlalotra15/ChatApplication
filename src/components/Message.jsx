import React, { useEffect, useState, useRef } from "react";
import { useChat } from "../context/ChatContext";

function Message({ message, onDelete, type }) {
  const { state } = useChat();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const dropdownRef = useRef(null);

  const currentUser = state.chats.find(
    (chat) => chat.id === state.activeChatId
  )?.name;
  const isOwn = message.user === currentUser;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  const handleDeleteClick = () => {
    setShowDropdown(false);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    onDelete(message.id);
    setShowDeleteModal(false);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
  };
  console.log(isOwn, "isOwn");

  return (
    <>
      <div className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
        <div
          className={`px-3 py-2 rounded-md shadow-sm text-sm relative ${
            isOwn ? "bg-[#005c4b]" : "bg-[#202c33]"
          }`}
        >
          {type === "group" && (
            <span className="text-white">{message.user}</span>
          )}
          <div className="flex gap-4">
            <div className="max-w-2xl text-[#e9edef]">{message.content} </div>
            <div>
              {isOwn && (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="text-xs cursor-pointer p-1  rounded"
                  >
                    <span class="material-symbols-outlined text-white">
                      keyboard_arrow_down
                    </span>
                  </button>

                  {showDropdown && (
                    <div className="absolute right-0 top-6 bg-white border border-gray-200 rounded-md shadow-lg z-10 min-w-[120px] ">
                      <button
                        onClick={handleDeleteClick}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-sm">
                          delete
                        </span>
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <p className="text-[10px] text-[#e9edef] text-right ">
            {message.timestamp}
          </p>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/60  flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <span class="material-symbols-outlined">delete</span>
              <h3 className="text-lg font-semibold text-gray-900">
                Delete Message
              </h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this message? This action cannot
              be undone.
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
                className="px-4 py-2 text-white border bg-blue-500 border-gray-300 rounded-md "
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

export default Message;
