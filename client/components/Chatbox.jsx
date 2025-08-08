import React from "react";
import socket from "../socket";
import { useEffect, useState } from "react";

const Chatbox = () => {
  const [message, setMessage] = useState("");
  const [chatlog, setChatlog] = useState([]);
  const [receiver, setReceiver] = useState("");

  useEffect(() => {
    socket.on("receive message", (data) => {
      console.log("Received message:", data);
      setChatlog((prev) => [...prev, data]);
    });

    return () => socket.off("receive message");
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("Logged in user:", user);
    const sender = user?.name || user?.email || "Anonymous";
    

    const messageData = { sender, receiver, message };
    socket.emit("send message", messageData);
    setMessage("");
  };

  return (
    <div>
      <h2>Chatbox</h2>
      <div>
        {chatlog.map((msg, idx) => {
          <div key={idx}>
            <strong>{msg.sender}:</strong>
            {msg.message}
          </div>;
        })}
      </div>
      <form onSubmit={handleSend}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <input
          type="text"
          placeholder="Receiver name"
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chatbox;
