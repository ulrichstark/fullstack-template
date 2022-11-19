import { useQuery } from "@tanstack/react-query";
import { createContext } from "react";
import { RouterProvider } from "react-router-dom";
import { axiosClient } from "./axiosClient";
import { Session } from "./models/Session";
import { router } from "./router";

export const SessionContext = createContext<Session | null>(null);

export function App() {
    const result = useQuery(["session"], () => axiosClient.get<Session | null>("/session"));
    const session = result.data?.data ?? null;

    return (
        <SessionContext.Provider value={session}>
            <RouterProvider router={router} />
        </SessionContext.Provider>
    );
}
