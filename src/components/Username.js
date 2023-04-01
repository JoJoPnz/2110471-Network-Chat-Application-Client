import { useEffect, useState } from "react";

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

  return <p>{name}</p>;
};

export default Username;
