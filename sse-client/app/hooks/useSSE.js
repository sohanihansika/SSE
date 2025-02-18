import { useState, useEffect } from "react";

const useSSE = () => {
    const [messages, setMessages] = useState([]);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const eventSource = new EventSource("http://localhost:4000/events");

        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.userId) {
                setUserId(data.userId);
            } else {
                setMessages(prev => [...prev, data]);
            }
        };

        return () => {
            eventSource.close();
        };
    }, []);

    return { messages, userId };
};

export default useSSE;
