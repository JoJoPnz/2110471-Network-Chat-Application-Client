import { useEffect, useState } from "react";
import "./UsernameInput.css";

const UsernameInput = ({ socket }) => {
  const [usernameInput, setUsernameInput] = useState("");

  const submitForm = (e) => {
    e.preventDefault();
    if (!usernameInput) {
      alert("Username can't be empty string");
    } else {
      socket.emit("setUsername", usernameInput);
      setUsernameInput("");
    }
  };

  const errorListener = (username) => {
    alert(`Username ${username} is already taken`);
  };

  useEffect(() => {
    socket.on("errorDuplicateUsername", errorListener);

    return () => {
      socket.off("errorDuplicateUsername", errorListener);
    };
  }, []);

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
