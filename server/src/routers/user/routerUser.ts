import { Router } from "express";
import { routePostUser } from "./routePostUser";

export const routerUser = Router();

routerUser.post("/", routePostUser);
