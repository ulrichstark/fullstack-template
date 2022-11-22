import { Request, Response } from "express";
import { prismaClient } from "../../prismaClient";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import { login } from "../../core/login";
import { getParameterString } from "../../util/getParameterString";
import { HttpError } from "../../models/HttpError";

export async function routePostUser(req: Request, res: Response) {
    const name = getParameterString(req, "name");
    const password = getParameterString(req, "password");

    const userWithSameName = await prismaClient.user.findFirst({ where: { name: name } });
    if (userWithSameName) {
        throw new HttpError(httpStatus.BAD_REQUEST, `User '${name}' already exists`);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prismaClient.user.create({ data: { name: name, password: hashedPassword } });

    await login(res, user);
}
