import { Request, Response } from "express";
import { prismaClient } from "../../prismaClient";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import { login } from "../../core/login";

export async function routePostSession(req: Request, res: Response) {
    let { name, password } = req.body;

    if (!name || !password) {
        res.status(httpStatus.BAD_REQUEST);
        res.send(`'name' and 'password' are required`);
        return;
    }

    name = name.trim();
    password = password.trim();

    const user = await prismaClient.user.findFirst({ where: { name: name } });
    const passwordMatches = user ? await bcrypt.compare(password, user.password) : false;

    if (!user || !passwordMatches) {
        res.status(httpStatus.BAD_REQUEST);
        res.send(`Name does not match password`);
        return;
    }

    await login(res, user);
}
