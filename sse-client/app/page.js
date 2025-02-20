'use client'; 

import { useState } from "react";
import useSSE from "./hooks/useSSE";

export default function Home() {
    const { messages, userId } = useSSE();
    const [filename, setFilename] = useState("");
    const [recipientIds, setRecipientIds] = useState("");

    const uploadFile = async () => {
        await fetch("http://localhost:4005/files/upload", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ senderId: userId, recipientIds, filename })
        });
    };

    return (
        <div style={{ padding: 20 }}>
            <h1>Server-Sent Events (SSE)</h1>

            {userId && <h2>Your User ID: {userId}</h2>}

            <input
                type="text"
                placeholder="Enter recipient user IDs"
                value={recipientIds}
                onChange={(e) => setRecipientIds(e.target.value)}
            />
            <input
                type="text"
                placeholder="Enter Filename"
                value={filename}
                onChange={(e) => setFilename(e.target.value)}
            />
            <button 
                onClick={uploadFile}
                disabled={!recipientIds || !filename}
            >
                Upload
            </button>

            <h2>Updates:</h2>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>{msg.message}</li>
                ))}
            </ul>
        </div>
    );
}
