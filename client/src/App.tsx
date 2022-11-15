import { useState } from "react";

export function App() {
    const [name, setName] = useState("");
    const [text, setText] = useState("");

    function handleSubmit() {
        fetch(import.meta.env.VITE_SERVER_URL, {
            method: "POST",
            body: JSON.stringify({ name: name }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((response) => setText(`Response: ${response.text}`))
            .catch((reason) => setText(`Error: ${reason}`));
    }

    return (
        <>
            <h1>Hello World</h1>
            <label>
                Name: <input value={name} onChange={(event) => setName(event.target.value)} />
            </label>
            <button onClick={handleSubmit}>Submit</button>
            <p>{text}</p>
        </>
    );
}
