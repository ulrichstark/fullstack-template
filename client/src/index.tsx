import "./styles";
import { createRoot } from "react-dom/client";
import { App } from "./components/App";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;

const container = document.getElementById("app") as HTMLElement;
const root = createRoot(container);
root.render(<App />);
