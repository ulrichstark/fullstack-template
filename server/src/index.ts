import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { routerUser } from "./routers/user/routerUser";

const app = express();

app.use(
    cors({
        origin: process.env.CLIENT_ORIGIN,
        credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser());

app.use("/user", routerUser);

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server listening on :${process.env.SERVER_PORT}`);
});
