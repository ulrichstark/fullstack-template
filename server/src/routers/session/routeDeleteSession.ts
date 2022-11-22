import { Request, Response } from "express";
import { prismaClient } from "../../prismaClient";
import { getSession } from "../../core/getSession";

export async function routeDeleteSession(req: Request, res: Response) {
    const session = await getSession(req);

    await prismaClient.session.update({ where: { id: session.id }, data: { timeExpiry: new Date(0) } });

    res.clearCookie("session");
    res.send("Session deleted");
}
