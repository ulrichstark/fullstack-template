import { Request } from "express";
import httpStatus from "http-status";
import { HttpError } from "../models/HttpError";
import { getParameter } from "./getParameter";

export function getParameterString(req: Request, name: string) {
    let value: string = getParameter(req, name, "string");
    value = value.trim();

    if (value.length === 0) {
        throw new HttpError(httpStatus.BAD_REQUEST, `Parameter '${name}' is empty`);
    }

    return value;
}
