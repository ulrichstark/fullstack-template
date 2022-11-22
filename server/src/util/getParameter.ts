import { Request } from "express";
import httpStatus from "http-status";
import { HttpError } from "../models/HttpError";

export function getParameter(req: Request, name: string, type?: string) {
    const value = req.body[name];

    if (!value) {
        throw new HttpError(httpStatus.BAD_REQUEST, `Parameter '${name}' is missing`);
    }

    if (type && typeof value !== type) {
        throw new HttpError(httpStatus.BAD_REQUEST, `Parameter '${name}' is not a ${type}`);
    }

    return value;
}
