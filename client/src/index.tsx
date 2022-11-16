import "./styles";
import { createRoot } from "react-dom/client";
import axios from "axios";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./routes/Home";
import { Register } from "./routes/Register";
import { Login } from "./routes/Login";

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/login",
        element: <Login />,
    },
]);

const container = document.getElementById("app") as HTMLElement;
const root = createRoot(container);
root.render(<RouterProvider router={router} />);
