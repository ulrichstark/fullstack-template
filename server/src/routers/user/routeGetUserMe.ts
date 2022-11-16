import { Request, Response } from "express";
import httpStatus from "http-status";
import { getSession } from "../../core/getSession";

export async function routeGetUserMe(req: Request, res: Response) {
    const session = await getSession(req);

    if (!session) {
        res.status(httpStatus.UNAUTHORIZED);
        res.send(httpStatus[httpStatus.UNAUTHORIZED]);
        return;
    }

    res.send(session.user.name);
}
