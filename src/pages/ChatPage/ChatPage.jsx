import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Username from "../../components/Username/Username";
import UsernameInput from "../../components/UsernameInput/UsernameInput";
import ClientList from "../../components/ClientList/ClientList";
import { useNavigate } from "react-router";
import "./ChatPage.css";
import GroupInput from "../../components/GroupInput/GroupInput";
import ChatWindow from "../../components/ChatWindow/ChatWindow";
import { storage } from "../../utils/storage";
import GroupList from "../../components/GroupList/GroupList";
import { useChatContext } from "../../context/ChatContext";

const ChatPage = () => {
  const [socket, setSocket] = useState(null);
  const navigate = useNavigate();
  const token = storage.getAccessToken();
  const { setIsChatting, setGroupInfo, setIsChatGroup } = useChatContext();

  socket?.on("error", (message) => {
    alert(message);
    navigate("/login");
  });
  socket?.emit("setUserOnline", token);

  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:3000`);
    socket?.emit("setUserOnline", token);
    setSocket(newSocket);

    return () => {
      newSocket.close();
      setIsChatting(false);
      setGroupInfo({});
      setIsChatGroup(false);
    };
  }, [setSocket]);

  return (
    <>
      {socket ? (
        <div className="chat-page-container">
          <div>
            <Username socket={socket} />
            <UsernameInput socket={socket} />
            <ClientList socket={socket} />
            <GroupInput socket={socket} />
            <GroupList socket={socket} />
          </div>
          <div className="chat-container">
            <ChatWindow socket={socket} />
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
