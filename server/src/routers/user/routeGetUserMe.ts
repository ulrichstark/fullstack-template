import { Request, Response } from "express";
import { getSession } from "../../core/getSession";

export async function routeGetUserMe(req: Request, res: Response) {
    const session = await getSession(req);

    if (!session) {
        res.json(null);
        return;
    }

    res.send(session.user.name);
}
