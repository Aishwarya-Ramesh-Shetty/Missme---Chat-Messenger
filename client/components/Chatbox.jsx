import React, { useEffect, useState, useRef } from "react";
import socket from "../socket";
const API_URL = import.meta.env.VITE_API_URL;



const Chatbox = () => {
  const [message, setMessage] = useState("");
  const [chatlog, setChatlog] = useState([]);
  const [receiver, setReceiver] = useState("");
  const [file, setFile] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const sender = user?.name || user?.email || "Anonymous";

  const chatEndRef = useRef(null);

  const fetchChatHistory = async () => {
    try {
      if (!sender || !receiver) return;

      const res = await fetch(
        `${API_URL}/api/chat/history?sender=${sender}&receiver=${receiver}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error(`Failed to fetch history: ${res.status}`);
      }

      const data = await res.json();
      setChatlog(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching chat history", err);
      setChatlog([]);
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

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatlog]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!receiver.trim()) {
      alert("Please enter a receiver name before sending");
      return;
    }
    if (!message.trim() && !file) return;

    let fileUrl = "";

    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch(`${API_URL}/api/uploads`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        if (!res.ok) throw new Error("Upload failed");
        const data = await res.json();
        fileUrl = data.fileUrl;
      } catch (err) {
        console.error("File upload failed:", err);
        return;
      }
    }

    const messageData = {
      sender,
      receiver,
      message: message.trim(),
      fileUrl,
    };

    socket.emit("send message", messageData);
    setMessage("");
    setFile(null);
  };

  return (
    <div className="max-w-3xl mx-auto mt-5 flex flex-col h-[80vh] border border-gray-300 rounded-lg p-4 bg-gray-50 font-sans">
      <h2 className="text-center mb-4 text-2xl font-semibold">TextMe</h2>

      <input
        type="text"
        placeholder="Receiver name"
        value={receiver}
        onChange={(e) => setReceiver(e.target.value)}
        className="mb-4 px-3 py-2 rounded-md border border-gray-300 text-lg focus:outline-none focus:ring-2 focus:ring-green-600"
      />

      <div className="flex-grow overflow-y-auto p-4 bg-white rounded-md shadow-inner mb-4">
        {chatlog.map((msg, idx) => {
          const isSender = msg.sender === sender;
          return (
            <div
              key={idx}
              className={`flex flex-col mb-2 ${isSender ? "items-end" : "items-start"}`}
            >
              <div
                className={`max-w-[70%] px-4 py-3 rounded-2xl shadow-md break-words ${
                  isSender
                    ? "bg-green-700 text-white rounded-tr-none"
                    : "bg-gray-200 text-black rounded-br-none"
                }`}
              >
                <div className="font-semibold mb-1 text-sm">{msg.sender}</div>
                {msg.message && <div>{msg.message}</div>}

                {msg.fileUrl && (
                  <div className="mt-2">
                    {msg.fileUrl.endsWith(".mp4") ? (
                      <video
                        src={msg.fileUrl}
                        controls
                        width="250"
                        className="rounded-lg"
                      />
                    ) : msg.fileUrl.match(/\.(jpg|jpeg|png)$/) ? (
                      <img
                        src={msg.fileUrl}
                        alt="sent"
                        className="max-w-[200px] rounded-lg"
                      />
                    ) : (
                      <a
                        href={msg.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className={`${
                          isSender ? "text-green-300" : "text-gray-800"
                        } underline`}
                      >
                        Download File
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
        <div ref={chatEndRef} />
      </div>

      <form onSubmit={handleSend} className="flex items-center gap-4">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message"
          className="flex-grow px-4 py-2 rounded-full border border-gray-300 text-lg focus:outline-none focus:ring-2 focus:ring-green-600"
        />
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button
          type="submit"
          className="bg-green-700 text-white rounded-full px-6 py-2 font-semibold hover:bg-green-800 transition-colors duration-200"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chatbox;
