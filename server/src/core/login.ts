import { User } from "@prisma/client";
import { Response } from "express";
import { prismaClient } from "../prismaClient";

export async function login(res: Response, user: User) {
    const maxAge = Number.parseInt(process.env.SESSION_MAXAGE);
    const timeExpiry = new Date(Date.now() + maxAge);
    const session = await prismaClient.session.create({ data: { userId: user.id, timeExpiry: timeExpiry } });

    res.cookie("session", session.id, {
        maxAge: maxAge,
        secure: true,
        sameSite: "strict",
    });

    res.send(session.id);
}
