import { useEffect, useState } from "react";
import "./GroupList.css";
import { getUserIdFromToken } from "../../utils/auth";

const GroupList = ({ socket }) => {
  const [groupList, setGroupList] = useState([]);
  const currentUserId = getUserIdFromToken();
  const getAllGroupListener = (groups) => {
    setGroupList(groups);
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
    <>
      <div>
        <div>Group List</div>
        <div>
          total group : <span>{countAllGroup(groupList)}</span>
        </div>
        {groupList.map((e, index) => (
          <div key={index}>
            {e.name}
            {e.users}
          </div>
        ))}

        {/*----------------- Implement here -----------------*/}
        {/* leave group if user already joined */}
        {/* <button>leave group</button> */}
        {/* join group if user has never been in group*/}
        {/* <button>join group</button> */}
        {/*----------------- Implement here -----------------*/}
      </div>
    </>
  );
};

export default GroupList;
