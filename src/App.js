import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Messages from "./components/Messages/Messages";
import MessageInput from "./components/MessageInput/MessageInput";
import UsernameInput from "./components/UsernameInput/UsernameInput";

import "./App.css";
import Username from "./components/Username/Username";
import ClientList from "./components/ClientList/ClientList";

function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:3000`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  return (
    <div className="App">
      <header className="app-header">React Chat</header>
      {socket ? (
        <>
          <Username socket={socket} />
          <UsernameInput socket={socket} />
          <ClientList socket={socket} />
          <div className="chat-container">
            <Messages socket={socket} />
            <MessageInput socket={socket} />
          </div>
        </>
      ) : (
        <div>Not Connected</div>
      )}
    </div>
  );
}

export default App;
