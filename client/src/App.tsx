import axios from "axios";
import { useState } from "react";

export function App() {
    const [name, setName] = useState("");
    const [text, setText] = useState("");

    function handleSubmit() {
        axios
            .post("/", { name: name })
            .then((response) => setText(`Response: ${response.data.text}`))
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
