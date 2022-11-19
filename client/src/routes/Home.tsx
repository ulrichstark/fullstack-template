import { useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { SessionContext } from "../App";
import { axiosClient } from "../axiosClient";

export function Home() {
    const session = useContext(SessionContext);
    const queryClient = useQueryClient();

    function handleLogout() {
        axiosClient.post("/user/logout").then(() => {
            queryClient.invalidateQueries(["/user/me"]);
        });
    }

    return (
        <>
            <h1>Home</h1>
            {session ? (
                <div>
                    <p>{session.user.name}</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <div>
                    <Link to="/register">Register</Link> - <Link to="/login">Login</Link>
                </div>
            )}
        </>
    );
}
