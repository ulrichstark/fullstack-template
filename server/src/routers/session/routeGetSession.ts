import { Request, Response } from "express";
import { getSession } from "../../core/getSession";

export async function routeGetSession(req: Request, res: Response) {
    try {
        const session = await getSession(req);
        res.send({ id: session.id, user: { name: session.user.name } });
    } catch {
        res.json(null);
    }
}
