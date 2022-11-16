import axios, { AxiosError } from "axios";
import { useState } from "react";

export function Login() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    function handleLogin() {
        setMessage("");

        axios
            .post("/user/login", { name: name, password: password })
            .then((response) => setMessage(response.data))
            .catch((error: AxiosError<any>) => setMessage(error.response?.data ?? error.message));
    }

    return (
        <>
            <h1>Login</h1>
            <div>
                <label>
                    Name: <input value={name} onChange={(event) => setName(event.target.value)} />
                </label>
            </div>
            <div>
                <label>
                    Password:{" "}
                    <input value={password} type="password" onChange={(event) => setPassword(event.target.value)} />
                </label>
            </div>
            <button onClick={handleLogin}>Login</button>
            <p>{message}</p>
        </>
    );
}
