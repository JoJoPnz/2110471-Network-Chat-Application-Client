import { useEffect, useState } from "react";
import "./ClientList.css";
import { VscCircleFilled } from "react-icons/vsc";

const ClientList = ({ socket }) => {
  const [clientList, setClientList] = useState([]);

  const getAllClientListener = (users) => {
    setClientList(users);
  };

  useEffect(() => {
    socket.on("getAllClient", getAllClientListener);

    return () => {
      socket.off("getAllClient", getAllClientListener);
    };
  }, []);

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
          <div key={index}>
            <div className="clientlist-row">
              <VscCircleFilled
                className={
                  e.status === "online" ? "icon-online" : "icon-offline"
                }
              />
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
            <div className="line-clientlist"></div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ClientList;
