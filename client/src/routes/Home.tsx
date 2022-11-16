import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function Home() {
    const [loading, setLoading] = useState(true);
    const [userName, setUserName] = useState<string | null>(null);

    function getUserName() {
        setLoading(true);

        axios
            .get("/user/me")
            .then((response: AxiosResponse<string>) => setUserName(response.data))
            .catch(() => setUserName(null))
            .finally(() => setLoading(false));
    }

    function handleLogout() {
        axios.post("/user/logout").then(() => getUserName());
    }

    useEffect(() => getUserName(), []);

    return (
        <>
            <h1>Home</h1>
            {loading ? (
                <p>Loading...</p>
            ) : userName === null ? (
                <div>
                    <Link to="/register">Register</Link> - <Link to="/login">Login</Link>
                </div>
            ) : (
                <div>
                    <p>{userName}</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            )}
        </>
    );
}
