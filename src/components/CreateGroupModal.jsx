import React, { useEffect, useState } from "react";
import { useChat } from "../context/ChatContext";

function CreateGroupModal({ onClose }) {
  const [groupName, setGroupName] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [availableMembers, setAvailableMembers] = useState([]);
  const { state, dispatch } = useChat();

  useEffect(() => {
    setAvailableMembers((prev) => {
      const groupMembers = state.chats.map((ele) => ele.name);
      console.log(groupMembers);
      return [...prev, ...groupMembers];
    });
  }, []);

  const handleAddMember = (member) => {
    if (!selectedMembers.includes(member)) {
      setSelectedMembers([...selectedMembers, member]);
    }
  };

  const handleRemoveMember = (member) => {
    setSelectedMembers(selectedMembers.filter((m) => m !== member));
  };

  const handleCreateGroup = () => {
    dispatch({
      type: "CREATE_NEW_GROUP",
      payload: {
        id: Date.now().toString(),
        name: groupName,
        members: [...selectedMembers],
        avatarColor: "bg-orange-500",
        lastMessage: "Let's queue up at 7!",
        messages: [],
      },
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60  flex justify-center items-center z-10">
      <div className="bg-white p-6 rounded-md w-lg">
        <h3 className="text-lg font-semibold mb-4 text-gray-950">
          Create Group
        </h3>
        <input
          type="text"
          placeholder="Group Name"
          className="border p-2 w-full rounded mb-4 text-gray-950"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <div className="mb-4">
          <h4 className="font-medium text-gray-950">Add Members</h4>
          <div className="gap-1 flex flex-wrap ">
            {availableMembers.map((member) => (
              <div key={member}>
                <button
                  onClick={() => handleAddMember(member)}
                  className="px-3 py-1 border rounded-md bg-blue-500 text-white"
                >
                  {member}
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <h4 className="font-medium text-gray-950">Selected Members</h4>
          <div className="flex flex-wrap gap-1">
            {selectedMembers.map((member) => (
              <div key={member} className="flex items-center">
                <div className="px-3 py-1 border rounded-md bg-blue-500 ">
                  {member}
                  <button
                    onClick={() => handleRemoveMember(member)}
                    className="ml-1 text-red-500"
                  >
                    ❌
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex  items-center justify-center gap-3">
          <button
            className=" bg-blue-800 text-white py-2 px-4 rounded-md"
            onClick={handleCreateGroup}
          >
            Create Group
          </button>
          <button
            className=" text-gray-500 py-2 px-4 bg-slate-200 "
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateGroupModal;
