import axios, { AxiosError } from "axios";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function Register() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setMessage("");
        axios
            .post("/user/register", { name: name, password: password })
            .then(() => navigate("/"))
            .catch((error: AxiosError<any>) => setMessage(error.response?.data ?? error.message));
    }

    return (
        <>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Name: <input name="name" value={name} onChange={(event) => setName(event.target.value)} />
                    </label>
                </div>
                <div>
                    <label>
                        Password:{" "}
                        <input
                            name="password"
                            value={password}
                            type="password"
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </label>
                </div>
                <button type="submit">Register</button>
            </form>
            <Link to="/login">Login</Link>
            <p>{message}</p>
        </>
    );
}
