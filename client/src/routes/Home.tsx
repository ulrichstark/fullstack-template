import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { axiosClient } from "../axiosClient";

export function Home() {
    const queryClient = useQueryClient();
    const { isLoading, isError, data } = useQuery(["/user/me"], () => axiosClient.get<string | null>("/user/me"));

    function handleLogout() {
        axiosClient.post("/user/logout").then(() => {
            queryClient.invalidateQueries(["/user/me"]);
        });
    }

    return (
        <>
            <h1>Home</h1>
            {isLoading ? (
                <p>Loading...</p>
            ) : isError ? (
                <p>Error</p>
            ) : data.data === null ? (
                <div>
                    <Link to="/register">Register</Link> - <Link to="/login">Login</Link>
                </div>
            ) : (
                <div>
                    <p>{data.data}</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            )}
        </>
    );
}
