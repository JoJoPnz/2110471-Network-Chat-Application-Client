import { useEffect, useState } from "react";
import "./GroupList.css";
import { getUserIdFromToken } from "../../utils/auth";
import { useChatContext } from "../../context/ChatContext";

const GroupList = ({ socket }) => {
  const [groupList, setGroupList] = useState([]);
  const currentUserId = getUserIdFromToken();
  const { setIsChatting, setIsChatGroup, groupInfo, setGroupInfo } =
    useChatContext();
  const getAllGroupListener = (groups) => {
    if (groupInfo) {
      for (const group of groups) {

        // bug here
        if (String(group.id) === String(groupInfo.id)) {
          setGroupInfo(group);
          // console.log(group);
          // console.log("======");
          // console.log(groupInfo);
          // console.log("======");
          break;
        }
      }
    }
    setGroupList(groups);
  };

  const onClickHandle = (groupData) => {
    if (groupData.users.includes(currentUserId)) {
      setIsChatting(true);
      setIsChatGroup(true);
      setGroupInfo(groupData);
      console.log(groupData);
    } else {
      alert("Please join this group first before chatting");
    }
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
        total group :{" "}
        <span className="user-count">{countAllGroup(groupList)}</span>
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
