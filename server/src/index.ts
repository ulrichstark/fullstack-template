import { config } from "dotenv";
config();

import express, { Request, Response } from "express";
import cors from "cors";
import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcrypt";
import status from "http-status";
import cookieParser from "cookie-parser";

const prisma = new PrismaClient();

const app = express();
app.use(
    cors({
        origin: process.env.CLIENT_ORIGIN,
        credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser());

async function login(res: Response, user: User) {
    const maxAge = Number.parseInt(process.env.SESSION_MAXAGE);
    const timeExpiry = new Date(Date.now() + maxAge);
    const session = await prisma.session.create({ data: { userId: user.id, timeExpiry: timeExpiry } });
    res.cookie("session", session.id, {
        maxAge: maxAge,
        secure: true,
        sameSite: "strict",
    });
    res.send(session.id);
}

async function getSession(req: Request) {
    const sessionId = req.cookies.session;

    if (!sessionId) {
        return null;
    }

    const session = await prisma.session.findUnique({
        where: { id: sessionId },
    });

    if (!session) {
        return null;
    }

    const now = new Date();

    if (now.getTime() > session.timeExpiry.getTime()) {
        return null;
    }

    return await prisma.session.update({
        where: { id: session.id },
        data: { timeActive: now },
        include: { user: true },
    });
}

app.post("/user/register", async (req: Request, res: Response) => {
    let { name, password } = req.body;

    if (!name || !password) {
        res.status(status.BAD_REQUEST);
        res.send(`'name' and 'password' not supplied`);
        return;
    }

    name = name.trim();
    password = password.trim();

    const userWithSameName = await prisma.user.findFirst({ where: { name: name } });
    if (userWithSameName) {
        res.status(status.BAD_REQUEST);
        res.send(`User '${name}' already exists`);
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({ data: { name: name, password: hashedPassword } });

    await login(res, user);
});

app.post("/user/login", async (req: Request, res: Response) => {
    let { name, password } = req.body;

    if (!name || !password) {
        res.status(status.BAD_REQUEST);
        res.send(`'name' and 'password' not supplied`);
        return;
    }

    name = name.trim();
    password = password.trim();

    const user = await prisma.user.findFirst({ where: { name: name } });
    const passwordMatches = user ? await bcrypt.compare(password, user.password) : false;

    if (!user || !passwordMatches) {
        res.status(400);
        res.send(`Name does not match password`);
        return;
    }

    await login(res, user);
});

app.get("/user/me", async (req: Request, res: Response) => {
    const session = await getSession(req);

    if (!session) {
        res.status(status.UNAUTHORIZED);
        res.send(status[status.UNAUTHORIZED]);
        return;
    }

    res.send(session.user.name);
});

app.post("/user/logout", async (req: Request, res: Response) => {
    const session = await getSession(req);

    if (!session) {
        res.status(status.UNAUTHORIZED);
        res.send(status[status.UNAUTHORIZED]);
        return;
    }

    await prisma.session.update({ where: { id: session.id }, data: { timeExpiry: new Date(0) } });
    res.clearCookie("session");
    res.send("Logout successful");
});

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server listening on :${process.env.SERVER_PORT}`);
});
