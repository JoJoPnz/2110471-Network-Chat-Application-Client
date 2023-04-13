import { useEffect, useState } from "react";
import "./GroupList.css";
import { getUserIdFromToken } from "../../utils/auth";
import { useChatContext } from "../../context/ChatContext";

const GroupList = ({ socket }) => {
  const [groupList, setGroupList] = useState([]);
  const currentUserId = getUserIdFromToken();
  const { setIsChatting, setIsChatGroup, setGroupInfo } = useChatContext();
  const getAllGroupListener = (groups) => {
    setGroupList(groups);
  };

  const onClickHandle = (groupInfo) => {
    setIsChatting(true);
    setIsChatGroup(true);
    setGroupInfo(groupInfo);
  };

  useEffect(() => {
    socket.on("getAllGroup", getAllGroupListener);
    return () => {
      socket.off("getAllGroup", getAllGroupListener);
    };
  }, []);

  const countAllGroup = (groupList) => {
    return groupList.length;
  };

return (
  <div className="group-list-container">
    <div className="group-list-header">Group List</div>
    <div className="group-list-total">
      total group : <span className="user-count">{countAllGroup(groupList)}</span>
    </div>
    {groupList.map((e, index) => (
      <div
        className="group-list-item"
        key={e._id}
        onClick={() => onClickHandle(e)}
      >
        <span>{e.name} :</span> {e.users} 
      </div>        
        // {/*----------------- Implement here -----------------*/ }
        // {/* leave group if user already joined */}
        // {/* <button>leave group</button> */}
        // {/* join group if user has never been in group*/}
        // {/* <button>join group</button> */}
        // {/*----------------- Implement here -----------------*/}
    ))}
  </div>
);
};

export default GroupList;
