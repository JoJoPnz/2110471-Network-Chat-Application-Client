import { useEffect, useState } from "react";
import "./GroupList.css";
import { getUserIdFromToken } from "../../utils/auth";
import { useChatContext } from "../../context/ChatContext";
import axios from "axios";
import { storage } from "../../utils/storage";

const GroupList = ({ socket }) => {
  const [groupList, setGroupList] = useState([]);
  const currentUserId = getUserIdFromToken();
  const {
    setIsChatting,
    setIsChatGroup,
    groupInfo,
    setGroupInfo,
    setIsLoadingChat,
  } = useChatContext();
  const getAllGroupListener = (groups) => {
    if (groupInfo) {
      for (const group of groups) {
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

  const onClickHandle = async (groupData) => {
    const isUserInGroup = groupData.users.includes(currentUserId);

    // if user not in group, can't see group chat
    if (!isUserInGroup) {
      alert("Please join this group first before chatting");
      return;
    }

    // setLoading when begin to fetch the data
    setIsLoadingChat(true);

    await axios
      .get(`${process.env.REACT_APP_API_URL}/groups/${groupData._id}`, {
        headers: {
          Authorization: `Bearer ${storage.getAccessToken()}`,
        },
      })
      .then(async (res) => {
        setIsChatting(true);
        setIsChatGroup(true);
        const group = await res.data.data;
        setGroupInfo(group);
        // finish fetch the data, set loading to false
        setIsLoadingChat(false);

        // socket.emit("updateChatGroup", groupId);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
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

  const DoesUserInGroup = (groupData, userId) => {
    return groupData.users.includes(userId);
  };

  const handleJoinGroup = async (groupId) => {
    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/groups/join`,
        { groupId },
        {
          headers: {
            Authorization: `Bearer ${storage.getAccessToken()}`,
          },
        }
      )
      .then(async (res) => {
        alert("Joined group successfully");
        setIsChatting(false);
        setIsChatGroup(false);
        setGroupInfo({});
        // finish fetch the data, set loading to false
        setIsLoadingChat(false);
        socket.emit("getAllGroup");
        socket.emit("updateChatGroup", groupId);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  const handleLeaveGroup = async (groupId) => {
    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/groups/leave`,
        { groupId },
        {
          headers: {
            Authorization: `Bearer ${storage.getAccessToken()}`,
          },
        }
      )
      .then(async (res) => {
        alert("Leaved group successfully");
        setIsChatting(false);
        setIsChatGroup(false);
        setGroupInfo({});
        // finish fetch the data, set loading to false
        setIsLoadingChat(false);
        socket.emit("getAllGroup");
        socket.emit("updateChatGroup", groupId);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  return (
    <div className="group-list-container">
      <div className="group-list-header">Group List</div>
      <div className="group-list-total">
        Total group :{" "}
        <span className="user-count">{countAllGroup(groupList)}</span>
      </div>
      <div className="scroll-group-list">
        {groupList.map((e, index) => (
          <div
            className="group-list-item"
            key={e._id}
            onClick={() => onClickHandle(e)}
          >
            <span>{e.name}</span>
            <div>
              {DoesUserInGroup(e, currentUserId) ? (
                <button
                  className="leave-button"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleLeaveGroup(e._id);
                  }}
                >
                  Leave
                </button>
              ) : (
                <button
                  className="join-button"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleJoinGroup(e._id);
                  }}
                >
                  Join
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupList;
