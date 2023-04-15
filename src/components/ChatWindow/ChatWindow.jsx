import { useEffect } from "react";
import { useChatContext } from "../../context/ChatContext";
import MessageInput from "../MessageInput/MessageInput";
import axios from "axios";
import { storage } from "../../utils/storage";

const ChatWindow = ({ socket }) => {
  const { isChatting, isChatGroup, groupInfo, setGroupInfo } = useChatContext();

  const updateChatGroupListener = async (groupId) => {
    console.log("GROUP INFO", groupInfo);
    if (!isChatting || !isChatGroup || groupInfo._id !== groupId) {
      return;
    }
    await axios
      .get(`${process.env.REACT_APP_API_URL}/groups/${groupId}`, {
        headers: {
          Authorization: `Bearer ${storage.getAccessToken()}`,
        },
      })
      .then((res) => {
        console.log("update chat now");
        console.log(res.data.data);
        setGroupInfo(res.data.data);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  useEffect(() => {
    socket.on("updateChatGroup", updateChatGroupListener);
    return () => {
      socket.off("updateChatGroup", updateChatGroupListener);
    };
  }, [isChatting, isChatGroup, groupInfo]);

  // chat group
  if (isChatting && isChatGroup)
    return (
      <>
        <div> CHATTING NOW! / this is groupId : {groupInfo._id}</div>
        <div>{groupInfo.name}</div>
        {/* this is object -> must loop to display messages */}
        {groupInfo.messages.map((message) => {
          // console.log(message);
          if (message.type === "System") {
            // display as system -> grey font color
            return (
              <div key={message._id}>
                <p>System : {message.text}</p>
                <p>==========================</p>
              </div>
            );
          } else {
            // display normal text
            return (
              <div key={message._id}>
                {/* <p>{message.senderId}</p> */}
                <p>
                  {message.sender.username} : {message.text}
                </p>
                <p>==========================</p>
              </div>
            );
          }
        })}
        <MessageInput socket={socket} groupId={groupInfo._id} />
      </>
    );
  // direct message
  else if (isChatting && !isChatGroup)
    return (
      <>
        <div>its dm!! my bro</div>
      </>
    );
  else
    return (
      <>
        <div>NO CHAT</div>
      </>
    );
};

export default ChatWindow;
