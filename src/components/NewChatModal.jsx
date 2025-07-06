import React, { useState } from "react";
import { useChat } from "../context/ChatContext";

function NewChatModal({ onClose }) {
  const [newPerson, setNewPerson] = useState("");
  const { dispatch } = useChat();

  const handleCreateChat = () => {
    if (newPerson.trim() !== "") {
      const newChat = {
        id: Date.now().toString(),
        name: newPerson,
        status: "offline",
        lastMessage: "",
        lastSeen: new Date().toLocaleTimeString(),
        avatarColor: "bg-green-500",
        messages: [],
      };
      console.log(newPerson);
      dispatch({
        type: "CREATE_NEW_CHAT",
        payload: newChat,
      });

      setNewPerson("");
      onClose();
    }
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-screen flex justify-center items-center z-10 bg-black/60">
      <div className="flex justify-center items-center bg-white flex-col gap-8 px-8 py-10 w-lg">
        <p className="text-lg text-gray-950">Create New Chat</p>

        <input
          type="text"
          placeholder="Enter user's name"
          value={newPerson}
          onChange={(e) => setNewPerson(e.target.value)}
          className="p-2 border mt-2 text-gray-950"
        />
        <div>
          <button
            onClick={handleCreateChat}
            className=" bg-blue-800 p-2 text-white me-1.5 rounded-xl"
          >
            Start Chat
          </button>
          <button
            onClick={onClose}
            className="bg-slate-200 p-2 text-slate-600 me-1.5 rounded-xl w-20"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewChatModal;
