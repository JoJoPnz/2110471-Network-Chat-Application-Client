import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Messages from "./components/Messages";
import MessageInput from "./components/MessageInput";
import UsernameInput from "./components/UsernameInput";

import "./App.css";
import Username from "./components/Username";

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
