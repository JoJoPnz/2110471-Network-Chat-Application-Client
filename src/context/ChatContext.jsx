import React, { createContext, useContext, useState } from "react";

const ChatContext = createContext();

export function useChatContext() {
  return useContext(ChatContext);
}

const ChatProvider = ({ children }) => {
  const [isChatting, setIsChatting] = useState(false);
  const [isChatGroup, setIsChatGroup] = useState(false);
  const [groupInfo, setGroupInfo] = useState({});
  const [isLoadingChat, setIsLoadingChat] = useState(false);
  const [chatter, setChatter] = useState("");

  return (
    <ChatContext.Provider
      value={{
        isChatting,
        setIsChatting,
        isChatGroup,
        setIsChatGroup,
        groupInfo,
        setGroupInfo,
        isLoadingChat,
        setIsLoadingChat,
        chatter,
        setChatter,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
