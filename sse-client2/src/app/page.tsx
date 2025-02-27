"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import useSSE from "./hooks/useSSE";

export default function Home() {
    const { messages, userId } = useSSE();
    const [filename, setFilename] = useState("");
    const [recipientIds, setRecipientIds] = useState("");

    const uploadFileMutation = useMutation({
        mutationFn: async () => {
            const response = await fetch("http://localhost:4000/files/upload", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ senderId: userId, recipientIds, filename }),
            });

            if (!response.ok) {
                throw new Error("File upload failed");
            }

            return response.json();
        },
    });

    return (
        <div className="home-container">
            <div className="home-card">
                <h1 className="home-title">Server-Sent Events (SSE)</h1>

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
                    onClick={() => uploadFileMutation.mutate()}
                    disabled={!recipientIds || !filename }
                    className={`home-button ${
                        !recipientIds || !filename ? "home-button-disabled" : "home-button-enabled"
                    }`}
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
