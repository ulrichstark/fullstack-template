import axios, { CreateAxiosDefaults } from "axios";

const config: CreateAxiosDefaults = {
    baseURL: import.meta.env.VITE_SERVER_URL,
    withCredentials: true,
};

export const axiosClient = axios.create(config);
