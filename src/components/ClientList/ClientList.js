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
      {clientList.map((e, index) => (
        <div>
          {index + 1}
          <div>{e.id ? e.id : ""}</div>
          <div>{e.username ? e.username : ""}</div>
        </div>
      ))}
    </>
  );
};

export default ClientList;
