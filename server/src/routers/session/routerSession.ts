import { Router } from "express";
import { routePostSession } from "./routePostSession";
import { routeGetSession } from "./routeGetSession";
import { routeDeleteSession } from "./routeDeleteSession";

export const routerSession = Router();

routerSession.get("/", routeGetSession);
routerSession.post("/", routePostSession);
routerSession.delete("/", routeDeleteSession);
