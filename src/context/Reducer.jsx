export const initialState = {
  activeChatId: null,
  chats: [
    {
      id: "1",
      name: "Gourav",
      status: "online",
      lastMessage: "Okay, I'll get it done.",
      lastSeen: "6:10 PM",
      avatarColor: "bg-blue-600",
      messages: [
        {
          id: "m1",
          user: "Gourav",
          type: "text",
          content: "hey Dinkar! wanna play valorant today",
          timestamp: "6:10 pm",
        },
        {
          id: "m2",
          user: "Dinkar",
          type: "text",
          content: "Yup I'm all ready bro.",
          timestamp: "6:15 pm",
        },
      ],
    },
    {
      id: "2",
      name: "Dinkar",
      status: "online",
      lastMessage: "hey Dinkar! wanna play valorant today",
      lastSeen: "6:15 PM",
      avatarColor: "bg-purple-600",
      messages: [
        {
          id: "m1",
          user: "Gourav",
          type: "text",
          content: "hey Dinkar! wanna play valorant today",
          timestamp: "6:10 pm",
        },
        {
          id: "m2",
          user: "Dinkar",
          type: "text",
          content: "Yup I'm all ready bro.",
          timestamp: "6:15 pm",
        },
      ],
    },
  ],
  groups: [
    {
      id: "g1",
      name: "Valorant Buddies",
      members: ["Gourav", "Dinkar", "Mehul"],
      avatarColor: "bg-red-600",
      lastMessage: "Let's queue up at 7!",
      lastSeen: "6:45 PM",
      messages: [
        {
          id: "gm1",
          user: "Mehul",
          type: "text",
          content: "Let's queue up at 7!",
          timestamp: "6:45 pm",
        },
        {
          id: "gm2",
          user: "Gourav",
          type: "text",
          content: "Cool, I’ll be there.",
          timestamp: "6:46 pm",
        },
      ],
    },
  ],
};

export function chatReducer(state, action) {
  switch (action.type) {
    case "SET_ACTIVE_CHAT":
      return {
        ...state,
        activeChatId: action.payload,
      };

    case "SEND_MESSAGE": {
      const { user, content, timestamp } = action.payload;

      if (
        state.activeChatId &&
        state.chats.find((chat) => chat.id === state.activeChatId)
      ) {
        const updatedChats = state.chats.map((chat) => {
          if (chat.id === state.activeChatId) {
            return {
              ...chat,
              messages: [
                ...chat.messages,
                { id: Date.now().toString(), user, content, timestamp },
              ],
              lastMessage: content,
              lastSeen: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              }),
            };
          } else if (chat.name === user) {
            return {
              ...chat,
              messages: [
                ...chat.messages,
                {
                  id: Date.now().toString(),
                  user: "You",
                  content,
                  timestamp,
                },
              ],
              lastMessage: content,
              lastSeen: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              }),
            };
          }
          return chat;
        });

        const activeChat = updatedChats.find(
          (chat) => chat.id === state.activeChatId
        );
        const otherChats = updatedChats.filter(
          (chat) => chat.id !== state.activeChatId
        );

        return {
          ...state,
          chats: [activeChat, ...otherChats],
        };
      }

      if (
        state.activeChatId &&
        state.groups.find((group) => group.id === state.activeChatId)
      ) {
        const updatedGroups = state.groups.map((group) =>
          group.id === state.activeChatId
            ? {
                ...group,
                messages: [...group.messages, action.payload],
                lastMessage: action.payload.content,
                lastSeen: new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                }),
              }
            : group
        );

        const activeGroup = updatedGroups.find(
          (group) => group.id === state.activeChatId
        );
        const otherGroups = updatedGroups.filter(
          (group) => group.id !== state.activeChatId
        );

        return {
          ...state,
          groups: [activeGroup, ...otherGroups],
        };
      }

      return state;
    }

    case "DELETE_MESSAGE": {
      const { messageId } = action.payload;

      if (
        state.activeChatId &&
        state.chats.find((chat) => chat.id === state.activeChatId)
      )
        return {
          ...state,
          chats: state.chats.map((ele) => {
            if (ele.id === state.activeChatId) {
              return {
                ...ele,
                messages: ele.messages.filter((msg) => msg.id !== messageId),
              };
            }
            return ele;
          }),
        };
      if (
        state.activeChatId &&
        state.groups.find((ele) => ele.id === state.activeChatId)
      )
        return {
          ...state,
          groups: state.groups.map((ele) => {
            if (ele.id === state.activeChatId) {
              return {
                ...ele,
                messages: ele.messages.filter((msg) => msg.id !== messageId),
              };
            }
            return ele;
          }),
        };
      return state;
    }

    case "CREATE_NEW_CHAT": {
      const newChat = action.payload;
      return {
        ...state,
        chats: [...state.chats, newChat],
        activeChatId: newChat.id,
      };
    }

    case "CREATE_NEW_GROUP": {
      const newGroup = action.payload;

      return {
        ...state,
        groups: [...state.groups, newGroup],
      };
    }

    default:
      return state;
  }
}
