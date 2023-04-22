import { useEffect, useRef, useState } from "react";
import "./MessageInput.css";
import { useChatContext } from "../../context/ChatContext";
import axios from "axios";
import { storage } from "../../utils/storage";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaPaperPlane } from "react-icons/fa";

const MessageInput = ({ socket, groupId }) => {
  const [messageInput, setMessageInput] = useState("");
  const { isChatGroup } = useChatContext();
  const buttonRef = useRef(null);

  const submitForm = async (e) => {
    // prevent multiple click
    buttonRef.current.disabled = true;

    e.preventDefault();
    if (!messageInput) {
      buttonRef.current.disabled = false;
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

    // prevent multiple click => set button enable after sent message
    buttonRef.current.disabled = false;
  };

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <form className="form-inline align-items-center" onSubmit={submitForm}>
      <input
        className="chat-message-send"
        autoFocus
        value={messageInput}
        placeholder="type message"
        style={{ height: "38px" }}
        onChange={(e) => {
          setMessageInput(e.currentTarget.value);
        }}
      />
      <button
        type="submit"
        className="send-button"
        ref={buttonRef}
        style={{ marginLeft: "15px" }}
      >
        send message <FaPaperPlane style={{ marginLeft: "5px" }} />
      </button>
    </form>
  );
};

export default MessageInput;
