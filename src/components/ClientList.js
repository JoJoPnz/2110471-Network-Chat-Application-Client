import { useEffect, useState } from "react";

const ClientList = ({ socket }) => {
  const [clientList, setClientList] = useState([]);

  const getAllClientListener = (users) => {
    setClientList(users);
  };

  socket.emit("getAllClient");

  useEffect(() => {
    socket.on("getAllClient", getAllClientListener);

    return () => {
      socket.off("getAllClient", getAllClientListener);
    };
  }, [socket]);

  return (
    <>
      <div>Client List</div>
      {clientList.map((e) => (
        <div>{e}</div>
      ))}
    </>
  );
};

export default ClientList;
