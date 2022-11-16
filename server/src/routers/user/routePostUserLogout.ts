import { Request, Response } from "express";
import { prismaClient } from "../../prismaClient";
import httpStatus from "http-status";
import { getSession } from "../../core/getSession";

export async function routePostUserLogout(req: Request, res: Response) {
    const session = await getSession(req);

    if (!session) {
        res.status(httpStatus.UNAUTHORIZED);
        res.send(httpStatus[httpStatus.UNAUTHORIZED]);
        return;
    }

    await prismaClient.session.update({ where: { id: session.id }, data: { timeExpiry: new Date(0) } });

    res.clearCookie("session");
    res.send("Logout successful");
}