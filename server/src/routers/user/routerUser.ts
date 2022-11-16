import { Router } from "express";
import { routePostUserRegister } from "./routePostUserRegister";
import { routePostUserLogin } from "./routePostUserLogin";
import { routeGetUserMe } from "./routeGetUserMe";
import { routePostUserLogout } from "./routePostUserLogout";

export const routerUser = Router();

routerUser.post("/register", routePostUserRegister);
routerUser.post("/login", routePostUserLogin);
routerUser.post("/logout", routePostUserLogout);
routerUser.get("/me", routeGetUserMe);
