import { Request } from "express";
import httpStatus from "http-status";
import { HttpError } from "../models/HttpError";
import { prismaClient } from "../prismaClient";

export async function getSession(req: Request) {
    const sessionId = req.cookies.session;

    if (sessionId) {
        const session = await prismaClient.session.findUnique({
            where: { id: sessionId },
        });

        if (session) {
            const now = new Date();

            if (now.getTime() < session.timeExpiry.getTime()) {
                return await prismaClient.session.update({
                    where: { id: session.id },
                    data: { timeActive: now },
                    include: { user: true },
                });
            }
        }
    }

    throw new HttpError(httpStatus.UNAUTHORIZED);
}
