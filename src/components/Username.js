import { useEffect, useState } from "react";
import './Username.css';

const Username = ({ socket }) => {
  const [name, setName] = useState("");

  const getUsernameListener = (newFetchName) => {
    setName(newFetchName);
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
      <div className="name-text">{name}</div>
    </div>
  );
};

export default Username;
