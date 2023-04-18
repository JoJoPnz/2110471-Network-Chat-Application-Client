import { useEffect } from "react";
import { useChatContext } from "../../context/ChatContext";
import MessageInput from "../MessageInput/MessageInput";
import axios from "axios";
import { storage } from "../../utils/storage";
import { getUserIdFromToken } from "../../utils/auth";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ChatWindow.css";

const ChatWindow = ({ socket }) => {
  const { isChatting, isChatGroup, groupInfo, setGroupInfo, isLoadingChat } =
    useChatContext();
  const userID = getUserIdFromToken();

  function SystemMessage({ text }) {
    const equals = "=".repeat(text.length + 10);

    return (
      <div className="chat-message-system">
        <p>{equals}</p>
        <p>{text}</p>
        <p>{equals}</p>
      </div>
    );
  }

  const updateChatGroupListener = async (groupId) => {
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
        setGroupInfo(res.data.data);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });

       const systemMessages = document.querySelectorAll(".system-message");
       systemMessages.forEach((message) => {
         message.style.backgroundColor = "#f7f7f7";
         message.style.fontSize = "14px";
         message.style.padding = "10px";
         message.style.margin = "10px auto";
         message.style.maxWidth = "80%";
       });
  };

  useEffect(() => {
    socket.on("updateChatGroup", updateChatGroupListener);
    return () => {
      socket.off("updateChatGroup", updateChatGroupListener);
    };
  }, [isChatting, isChatGroup, groupInfo]);

  // loading (fetching group message)
  if (isLoadingChat) return <div> loading . . .</div>;

  if (isChatting && isChatGroup)
    // chat group
    return (
      <div className="chat-window-container">
        <div className="groupname">{groupInfo.name}</div>
        {/* this is object -> must loop to display messages */}
        {groupInfo.messages.map((message) => {
          //console.log(message.sender);
          if (message.type === "System") {
            // display as system -> grey font color
            return (
              <div key={message._id} className="chat-message-system">
                <p>
                  ----------------------------&nbsp;&nbsp; {message.text}{" "}
                  &nbsp;&nbsp;----------------------------
                </p>
              </div>
            );
          } else {
            // display normal text
            // display normal text
            // display normal text
            // display normal text
            if (message.sender._id == userID) {
              return (
                <div className="d-flex justify-content-end" key={message._id}>
                  <div className="bg-primary text-white p-2 rounded mb-2">
                    <p className="m-0">{message.text}</p>
                  </div>
                </div>
              );
            } else {
              return (
                <div key={message._id}>
                  {/* <p>{message.senderId}</p> */}
                  <div
                    className="bg-primary text-white p-2 rounded mb-2 d-inline-block"
                    style={{ maxWidth: "80%" }}
                  >
                    <p className="m-0">
                      {message.sender.username} : {message.text}
                    </p>
                  </div>
                </div>
              );
            }
          }
        })}
        <MessageInput socket={socket} groupId={groupInfo._id} />
      </div>
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
