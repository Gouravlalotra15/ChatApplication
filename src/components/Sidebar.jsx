import React, { useState } from "react";
import ChatList from "./ChatList";
import CreateGroupModal from "./CreateGroupModal";
import NewChatModal from "./NewChatModal";

function Sidebar() {
  const [activeTab, setActiveTab] = useState("all");
  const [isModalOpen, setModalOpen] = useState(false);
  const [isNewChatModalOpen, setNewChatModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const handelSearch = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="w-1/3 border-r-2 border-gray-200 h-full flex flex-col bg-[#2b2b3c] text-[#f0f0f5] p-4">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-white">Messages</h2>
      </div>
      <div className="p-3 border-b border-gray-100">
        <input
          type="text"
          placeholder="Search"
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          value={searchInput}
          onChange={handelSearch}
        />
        <div className="flex mt-3 text-sm">
          {["all", "people", "groups"].map((tab) => (
            <button
              key={tab}
              className={`capitalize mr-3 px-2 pb-1 border-b-2 ${
                activeTab === tab
                  ? "border-green-600 text-green-600 font-medium"
                  : "border-transparent text-gray-500"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className="p-3">
        {/* Group  */}
        {activeTab === "groups" && (
          <div>
            <button
              className="w-full text-blue-500 border-b border-blue-500 py-2"
              onClick={() => setModalOpen(true)}
            >
              + Create Group
            </button>

            <ChatList type={"group"} searchInput={searchInput} />
          </div>
        )}

        {/* People  */}
        {activeTab === "people" && (
          <div>
            <button
              className="w-full text-blue-500 border-b border-blue-500 py-2"
              onClick={() => setNewChatModalOpen(true)}
            >
              + Start New Chat
            </button>
            <ChatList type={"people"} searchInput={searchInput} />
          </div>
        )}
        {/* All   */}
        {activeTab !== "groups" && activeTab !== "people" && (
          <ChatList type={"all"} searchInput={searchInput} />
        )}
      </div>

      {/* To create a new group */}

      {isModalOpen && (
        <CreateGroupModal
          onClose={() => {
            setModalOpen(false);
          }}
        />
      )}
      {/* for creating a new person */}
      {isNewChatModalOpen && activeTab === "people" && (
        <NewChatModal onClose={() => setNewChatModalOpen(false)} />
      )}
    </div>
  );
}

export default Sidebar;
