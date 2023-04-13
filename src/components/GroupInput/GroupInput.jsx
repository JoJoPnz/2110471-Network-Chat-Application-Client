import { useEffect, useState } from "react";
import "./GroupInput.css";

const GroupInput = ({ socket }) => {
  const [groupNameInput, setGroupNameInput] = useState("");

  const submitForm = (e) => {
    e.preventDefault();
    if (!groupNameInput) {
      alert("Group name can't be empty string");
    } else {
      socket.emit("createGroup", groupNameInput);
      setGroupNameInput("");
    }
  };

  const errorListener = (groupName) => {
    alert(`Group name ${groupName} is already taken`);
  };

  useEffect(() => {
    socket.on("errorDuplicateGroupName", errorListener);

    return () => {
      socket.off("errorDuplicateGroupName", errorListener);
    };
  }, []);

  return (
    <form onSubmit={submitForm} className="form-submitGroupName">
      <div className="inputCreateGroup-container">
        <div className="createGroup-text">Create Group : </div>
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
          create
        </button>
      </div>
    </form>
  );
};

export default GroupInput;
