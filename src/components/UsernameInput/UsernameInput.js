import { useEffect, useState } from "react";
import "./UsernameInput.css";

const UsernameInput = ({ socket }) => {
  const [usernameInput, setUsernameInput] = useState("");

  const submitForm = (e) => {
    e.preventDefault();
    socket.emit("setUsername", usernameInput);
    setUsernameInput("");
  };

  const errorListener = (username) => {
    alert(username + "ERRRRORORRORRORO");
  };

  useEffect(() => {
    socket.on("errorDuplicateUsername", errorListener);

    return () => {
      socket.off("errorDuplicateUsername", errorListener);
    };
  }, [socket]);

  return (
    <form onSubmit={submitForm}>
      <input
        className="input-username"
        autoFocus
        value={usernameInput}
        placeholder="Set your username"
        onChange={(e) => {
          setUsernameInput(e.currentTarget.value);
        }}
      />
      <button type="submit" className="send-button-username">
        set
      </button>
    </form>
  );
};

export default UsernameInput;
