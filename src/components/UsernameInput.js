import { useEffect, useState } from "react";

const UsernameInput = ({ socket }) => {
  const [name, setName] = useState("");

  const submitForm = (e) => {
    e.preventDefault();
    socket.emit("setUsername", name);
    setName("");
    socket.emit("getUsername");
  };

  const errorListener = (userName) => {
    alert(userName + "ERRRRORORRORRORO");
  };

  useEffect(() => {
    socket.on("errorDuplicateName", errorListener);

    return () => {
      socket.off("errorDuplicateName", errorListener);
    };
  }, [socket]);

  return (
    <form onSubmit={submitForm}>
      <input
        autoFocus
        value={name}
        placeholder="Set your name"
        onChange={(e) => {
          setName(e.currentTarget.value);
        }}
      />
      <button type="submit" className="send-button">
        set name
      </button>
    </form>
  );
};

export default UsernameInput;
