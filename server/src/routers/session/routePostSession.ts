import { Request, Response } from "express";
import { prismaClient } from "../../prismaClient";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import { login } from "../../core/login";
import { getParameterString } from "../../util/getParameterString";
import { HttpError } from "../../models/HttpError";

export async function routePostSession(req: Request, res: Response) {
    const name = getParameterString(req, "name");
    const password = getParameterString(req, "password");

    const user = await prismaClient.user.findFirst({ where: { name: name } });
    const passwordMatches = user ? await bcrypt.compare(password, user.password) : false;

    if (!user || !passwordMatches) {
        throw new HttpError(httpStatus.BAD_REQUEST, `Name does not match password`);
    }

    await login(res, user);
}
