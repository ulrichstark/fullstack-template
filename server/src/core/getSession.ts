import { Request } from "express";
import { prismaClient } from "../prismaClient";

export async function getSession(req: Request) {
    const sessionId = req.cookies.session;

    if (!sessionId) {
        return null;
    }

    const session = await prismaClient.session.findUnique({
        where: { id: sessionId },
    });

    if (!session) {
        return null;
    }

    const now = new Date();
    if (now.getTime() > session.timeExpiry.getTime()) {
        return null;
    }

    return await prismaClient.session.update({
        where: { id: session.id },
        data: { timeActive: now },
        include: { user: true },
    });
}
