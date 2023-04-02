import { useEffect, useState } from "react";
import "./Username.css";

const Username = ({ socket }) => {
  const [username, setUsername] = useState("");

  const getUsernameListener = (newFetchUsername) => {
    setUsername(newFetchUsername);
  };

  socket.emit("getUsername");

  useEffect(() => {
    socket.on("getUsername", getUsernameListener);

    return () => {
      socket.off("getUsername", getUsernameListener);
    };
  }, [socket]);

  return (
    <div className="username-container">
      <div className="name-text">{username}</div>
    </div>
  );
};

export default Username;
