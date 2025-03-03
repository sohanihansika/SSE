"use client";

import { useState } from "react";
import useWebSocket from "./hooks/useWebSocket";

export default function Home() {
  const { messages, userId, socket } = useWebSocket();
  const [filename, setFilename] = useState("");
  const [recipientIds, setRecipientIds] = useState("");

  const handleUpload = () => {
    if (socket && userId && filename && recipientIds) {
      console.log("Emitting uploadFile event:", { senderId: userId, recipientIds, filename });
      socket.emit("uploadFile", { senderId: userId, recipientIds, filename });
    }
  };
  

  return (
    <div className="home-container">
      <div className="home-card">
        <h1 className="home-title">WebSockets</h1>

        {userId && <h2 className="uid">Your User ID: {userId}</h2>}

        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter Recipient User IDs"
            value={recipientIds}
            onChange={(e) => setRecipientIds(e.target.value)}
            className="home-input"
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter Filename"
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
            className="home-input"
          />
        </div>

        <button
          onClick={handleUpload}
          disabled={!recipientIds || !filename}
          className={`home-button ${!recipientIds || !filename ? "home-button-disabled" : "home-button-enabled"}`}
        >
          Upload
        </button>

        <h2 className="home-updates-title">Updates:</h2>
        <ul>
          {messages.map((msg, index) => (
            <li key={index} className="home-message">
              {msg.message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
