import { useEffect, useState } from "react";
import "./MessageInput.css";
import { useChatContext } from "../../context/ChatContext";
import axios from "axios";
import { storage } from "../../utils/storage";

const MessageInput = ({ socket, groupId }) => {
  const [messageInput, setMessageInput] = useState("");
  const { isChatGroup } = useChatContext();

  const submitForm = async (e) => {
    e.preventDefault();
    if (!messageInput) {
      alert("Message can't be empty string");
      return;
    }
    // check dm or group message
    if (isChatGroup) {
      await axios
        .post(
          `${process.env.REACT_APP_API_URL}/groups/message`,
          {
            groupId,
            message: { type: "User", text: messageInput },
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
          alert(err.response.data.message);
        });
    } else {
    }
    setMessageInput("");
  };

  useEffect(() => {
    return () => {};
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
