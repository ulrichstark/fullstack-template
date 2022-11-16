import { Request, Response } from "express";
import { prismaClient } from "../../prismaClient";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import { login } from "../../core/login";

export async function routePostUserRegister(req: Request, res: Response) {
    let { name, password } = req.body;

    if (!name || !password) {
        res.status(httpStatus.BAD_REQUEST);
        res.send(`'name' and 'password' are required`);
        return;
    }

    name = name.trim();
    password = password.trim();

    const userWithSameName = await prismaClient.user.findFirst({ where: { name: name } });
    if (userWithSameName) {
        res.status(httpStatus.BAD_REQUEST);
        res.send(`User '${name}' already exists`);
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prismaClient.user.create({ data: { name: name, password: hashedPassword } });

    await login(res, user);
}
