import React, { useEffect, useState } from "react";
import socket from "../socket";

const Chatbox = () => {
  const [message, setMessage] = useState("");
  const [chatlog, setChatlog] = useState([]);
  const [receiver, setReceiver] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const sender = user?.name || user?.email || "Anonymous";

  const fetchChatHistory = async () => {
    try {
      if (!sender || !receiver) return;

      const res = await fetch(
        `http://localhost:5000/api/chat/history?sender=${sender}&receiver=${receiver}`
      );
      const data = await res.json();
      setChatlog(data);
    } catch (err) {
      console.error("Error fetching chat history", err);
    }
  };

  useEffect(() => {
    if (receiver.trim()) {
      fetchChatHistory();
    }
  }, [receiver]);

  useEffect(() => {
    const handleReceive = (data) => {
      if (
        (data.sender === sender && data.receiver === receiver) ||
        (data.sender === receiver && data.receiver === sender)
      ) {
        setChatlog((prev) => [...prev, data]);
      }
    };

    socket.on("receive message", handleReceive);

    return () => socket.off("receive message", handleReceive);
  }, [sender, receiver]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const messageData = { sender, receiver, message };
    socket.emit("send message", messageData);
    setMessage("");
  };

  return (
    <div>
      <h2>Chatbox</h2>

      <input
        type="text"
        placeholder="Receiver name"
        value={receiver}
        onChange={(e) => setReceiver(e.target.value)}
        style={{ marginBottom: "10px" }}
      />

      <div
        style={{
          height: "300px",
          overflowY: "scroll",
          border: "1px solid black",
          padding: "10px",
          marginBottom: "10px",
        }}
      >
        {chatlog.map((msg, idx) => (
          <div
            key={idx}
            style={{
              textAlign: msg.sender === sender ? "right" : "left",
              margin: "5px 0",
            }}
          >
            <strong>{msg.sender}:</strong> {msg.message}
          </div>
        ))}
      </div>

      <form onSubmit={handleSend}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message"
          style={{ width: "70%" }}
        />
        <button type="submit" style={{ marginLeft: "10px" }}>
          Send
        </button>
      </form>
    </div>
  );
};

export default Chatbox;
