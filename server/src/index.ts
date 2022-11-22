import dotenv from "dotenv";
dotenv.config();

import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "express-async-errors";
import { routerUser } from "./routers/user/routerUser";
import { routerSession } from "./routers/session/routerSession";
import { HttpError } from "./models/HttpError";

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
app.use("/session", routerSession);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof HttpError) {
        res.status(err.status);
        res.send(err.message);
    } else {
        next(err);
    }
});

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server listening on :${process.env.SERVER_PORT}`);
});
