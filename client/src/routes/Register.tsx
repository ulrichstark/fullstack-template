import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Register() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    function handleRegister() {
        setMessage("");

        axios
            .post("/user/register", { name: name, password: password })
            .then(() => navigate("/"))
            .catch((error: AxiosError<any>) => setMessage(error.response?.data ?? error.message));
    }

    return (
        <>
            <h1>Register</h1>
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
            <button onClick={handleRegister}>Register</button>
            <p>{message}</p>
        </>
    );
}
