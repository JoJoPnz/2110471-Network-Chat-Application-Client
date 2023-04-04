import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Username from "../../components/Username/Username";
import UsernameInput from "../../components/UsernameInput/UsernameInput";
import ClientList from "../../components/ClientList/ClientList";
import { useTokenContext } from "../../context/TokenContext";
import { useNavigate } from "react-router";
import "./ChatPage.css";

const ChatPage = () => {
  const [socket, setSocket] = useState(null);
  const navigate = useNavigate();
  const { token } = useTokenContext();
  socket?.emit("setUserOnline", token);

  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:3000`);
    socket?.emit("setUserOnline", token);
    setSocket(newSocket);

    return () => newSocket.close();
  }, [setSocket]);

  return (
    <>
      {socket ? (
        <div className="chat-page-container">
          <div>
            <Username socket={socket} />
            <UsernameInput socket={socket} />
            <ClientList socket={socket} />
          </div>
          <div className="chat-container">
            {/* <Messages socket={socket} /> */}
            {/* <MessageInput socket={socket} /> */}
          </div>
        </div>
      ) : (
        <div>Not Connected</div>
      )}
    </>
  );
};

export default ChatPage;
