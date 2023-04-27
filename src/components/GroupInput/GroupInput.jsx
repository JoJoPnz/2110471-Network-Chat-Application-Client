import { useEffect, useState } from "react";
import "./GroupInput.css";
import axios from "axios";
import { storage } from "../../utils/storage";

const GroupInput = ({ socket }) => {
  const [groupNameInput, setGroupNameInput] = useState("");

  const submitForm = async (e) => {
    e.preventDefault();
    if (!groupNameInput) {
      alert("Group name can't be empty string");
    } else {
      await axios
        .post(
          `${process.env.REACT_APP_API_URL}/groups`,
          {
            name: groupNameInput,
          },
          {
            headers: {
              Authorization: `Bearer ${storage.getAccessToken()}`,
            },
          }
        )
        .then((res) => {
          socket.emit("createGroup");
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
      setGroupNameInput("");
    }
  };

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <form onSubmit={submitForm} className="form-submitGroupName">
      <div className="inputCreateGroup-container">
        <div className="createGroup-text">Create Group : </div>
        <div className="create-group-form">
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
      </div>
    </form>
  );
};

export default GroupInput;
