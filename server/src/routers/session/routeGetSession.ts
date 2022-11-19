import { Request, Response } from "express";
import { getSession } from "../../core/getSession";

export async function routeGetSession(req: Request, res: Response) {
    const session = await getSession(req);

    if (!session) {
        res.json(null);
        return;
    }

    res.send({ id: session.id, user: { name: session.user.name } });
}
