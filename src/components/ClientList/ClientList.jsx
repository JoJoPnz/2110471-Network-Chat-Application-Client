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
    let count = 0;
    for (const user of clientList) {
      if (user.status === "online")
        count += 1;
    }
    return count;
  };

  return (
    <>
      <div className="clientlist-container">
        <div className="clientlist-title">Client List</div>
        <div className="totaluser-text">
          Total user online :{" "}
          <span className="user-count">{countAllOnlineUser(clientList)}</span>
        </div>  
        {clientList.map((e, index) => (
            <div key={index}>
              <div
                className={ (e.id === socket.id ? "clientlist-row2": "clientlist-row"  )}
                onClick={e.id !== socket.id ? () => console.log("chat") : undefined}
              >
                <VscCircleFilled
                  className={e.status === "online" ? "icon-online" : "icon-offline"}
                  style={{ width: "25px", height: "25px" }}
                />
                <div
                  className={
                    "clientlist-username " + (e.status !== "online" ? "user-offline" : "")
                  }
                >
                  {e.username ? e.username + (e.id === socket.id ? " (me)" : "") : ""}
                </div>
              </div>
            </div>
          ))}

      </div>
    </>
  );
};

export default ClientList;
