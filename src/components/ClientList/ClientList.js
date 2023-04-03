import { useEffect, useState } from "react";
import "./ClientList.css";
import { VscCircleFilled } from "react-icons/vsc";

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

  const countAllOnlineUser = (clientList) => {
    return clientList.length;
  };

  return (
    <>
      <div className="clientlist-container">
        <div className="clientlist-title">Client List</div>
        <div className="totaluser-text">
          total user online :{" "}
          <span className="user-count">{countAllOnlineUser(clientList)}</span>
        </div>
        {clientList.map((e, index) => (
          <div>
            <div className="clientlist-row">
              <VscCircleFilled className="icon-circle" />
              <div className="clientlist-username">
                {e.username
                  ? e.username + (e.id === socket.id ? " (me)" : "")
                  : ""}
              </div>
              {e.id !== socket.id ? (
                <button type="button" className="chat-button">
                  chat
                </button>
              ) : (
                <></>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ClientList;
