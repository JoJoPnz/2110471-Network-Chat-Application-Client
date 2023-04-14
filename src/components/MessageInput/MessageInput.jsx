import { useEffect, useState } from "react";
import "./MessageInput.css";
import { useChatContext } from "../../context/ChatContext";
import axios from "axios";
import { getUserIdFromToken } from "../../utils/auth";
import { storage } from "../../utils/storage";

const MessageInput = ({ socket, groupId }) => {
  const [messageInput, setMessageInput] = useState("");
  const { isChatGroup } = useChatContext();
  const currentUserId = getUserIdFromToken();

  const submitForm = async (e) => {
    e.preventDefault();
    if (!messageInput) {
      alert("Message can't be empty string");
      return;
    }
    // check dm or group message
    if (isChatGroup) {
      await axios
        .patch(
          `${process.env.REACT_APP_API_URL}/groups/${groupId}`,
          {
            messages: [
              { type: "User", sender: currentUserId, text: messageInput },
            ],
          },
          {
            headers: {
              Authorization: `Bearer ${storage.getAccessToken()}`,
            },
          }
        )
        .then((res) => {
          socket.emit("updateChatGroup", groupId);
        })
        .catch((err) => {
          alert("error");
        });
    } else {
    }
    setMessageInput("");
  };

  // const sendMessageListener = (username) => {
  //   alert(`Username ${username} is already taken`);
  // };

  useEffect(() => {
    // socket.on("sendMessage", sendMessageListener);

    return () => {
      // socket.off("sendMessage", sendMessageListener);
    };
  }, []);

  return (
    <form onSubmit={submitForm}>
      <input
        className=""
        autoFocus
        value={messageInput}
        placeholder="type message"
        onChange={(e) => {
          setMessageInput(e.currentTarget.value);
        }}
      />
      <button type="submit" className="">
        set
      </button>
    </form>
  );
};

export default MessageInput;
