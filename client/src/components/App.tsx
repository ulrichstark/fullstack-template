import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { IMessage } from "../models/IMessage";

export function App() {
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [text, setText] = useState("");
    const [error, setError] = useState("");

    function getMessages() {
        axios
            .get("/messages")
            .then((response: AxiosResponse<IMessage[]>) => setMessages(response.data))
            .catch((error: AxiosError) => setError(error.message));
    }

    function handleSendMessage() {
        setError("");
        setText("");

        axios
            .post("/messages", { text: text })
            .then(() => getMessages())
            .catch((error: AxiosError) => setError(error.message));
    }

    useEffect(() => getMessages(), []);

    return (
        <>
            <h1>Hello World</h1>
            <label>
                Text: <input value={text} onChange={(event) => setText(event.target.value)} />
            </label>
            <button onClick={handleSendMessage}>Send Message</button>
            <ol>
                {messages.map((message) => (
                    <li key={message.id}>
                        <h2>{message.text}</h2>
                        <p>{new Date(message.time).toLocaleString()}</p>
                    </li>
                ))}
            </ol>
            {error && <p>Error: {error}</p>}
        </>
    );
}
