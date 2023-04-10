import { useEffect, useState } from "react";
import "./GroupInput.css";

const GroupInput = ({ socket }) => {
  const [groupNameInput, setGroupNameInput] = useState("");

  const submitForm = (e) => {
    e.preventDefault();
    if (!groupNameInput) {
      alert("Group name can't be empty string");
    } else {
      // socket.emit("setUsername", groupNameInput);
      setGroupNameInput("");
    }
  };

  const errorListener = (groupName) => {
    alert(`Group name ${groupName} is already taken`);
  };

  useEffect(() => {
    // socket.on("errorDuplicateUsername", errorListener);

    return () => {
      // socket.off("errorDuplicateUsername", errorListener);
    };
  }, []);

  return (
    <form onSubmit={submitForm}>
      <input
        className="input-groupName"
        autoFocus
        value={groupNameInput}
        placeholder="Fill in group name"
        onChange={(e) => {
          setGroupNameInput(e.currentTarget.value);
        }}
      />
      <button type="submit" className="send-button-groupName">
        set
      </button>
    </form>
  );
};

export default GroupInput;
