import { useChatContext } from "../../context/ChatContext";

const ChatWindow = ({ socket }) => {
  const { isChatting, isChatGroup, groupInfo } = useChatContext();

  // chat group
  if (isChatting && isChatGroup)
    return (
      <>
        <div> CHATTING NOW! / this is groupId : {groupInfo._id}</div>
        <div>{groupInfo.name}</div>
        {/* this is object -> must loop to display messages */}
        {groupInfo.messages.map((message) => {
          console.log(message);
          if (message.type === "System") {
            // display as system -> grey font color
            return (
              <>
                <p>System : {message.text}</p>
                <p>==========================</p>
              </>
            );
          } else {
            // display normal text
            return (
              <>
                {/* <p>{message.senderId}</p> */}
                <p>
                  {message.senderId.username} : {message.text}
                </p>
                <p>==========================</p>
              </>
            );
          }
        })}
      </>
    );
  // direct message
  else if (isChatting && !isChatGroup)
    return (
      <>
        <div>its dm!! my bro</div>
      </>
    );
  else
    return (
      <>
        <div>NO CHAT</div>
      </>
    );
};

export default ChatWindow;
