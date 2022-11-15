import axios from "axios";
import { useEffect, useState } from "react";
import { IMessage } from "../models/IMessage";

export function App() {
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [text, setText] = useState("");
    const [error, setError] = useState("");

    function getMessages() {
        axios
            .get("/messages")
            .then((response) => setMessages(response.data))
            .catch((reason) => setError(reason));
    }

    function handleSendMessage() {
        setText("");

        axios
            .post("/messages", { text: text })
            .then(() => getMessages())
            .catch((reason) => setError(reason));
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
