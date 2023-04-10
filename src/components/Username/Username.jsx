import { useEffect, useState } from "react";
import "./Username.css";

const Username = ({ socket }) => {
  const [username, setUsername] = useState("");

  const getUsernameListener = (newFetchUsername) => {
    setUsername(newFetchUsername);
  };

  useEffect(() => {
    socket.on("getUsername", getUsernameListener);

    return () => {
      socket.off("getUsername", getUsernameListener);
    };
  }, []);

  return (
    <div className="username-container">
      <div className="name-text">{username}</div>
    </div>
  );
};

export default Username;
